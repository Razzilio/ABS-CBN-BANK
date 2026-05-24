from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

# Create tables
models.Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DB ----------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

# ---------------- SCHEMAS ----------------

class AccountCreate(BaseModel):
    name: str
    balance: float = 0

class Transaction(BaseModel):
    amount: float

class Transfer(BaseModel):
    from_id: int
    to_id: int
    amount: float

class RegisterUser(BaseModel):
    name: str

# ---------------- ROOT ----------------

@app.get("/")
def root():
    return {"message": "Bank API Running"}

# ---------------- ACCOUNTS ----------------

@app.post("/accounts/")
def create_account(account: AccountCreate, db: db_dependency):
    db_account = models.Bank(
        name=account.name,
        balance=account.balance
    )
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account


@app.get("/accounts/")
def get_accounts(db: db_dependency):
    return db.query(models.Bank).all()


@app.get("/accounts/{account_id}")
def get_account(account_id: int, db: db_dependency):
    acc = db.query(models.Bank).filter(models.Bank.id == account_id).first()
    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")
    return acc


@app.delete("/accounts/{account_id}")
def delete_account(account_id: int, db: db_dependency):
    acc = db.query(models.Bank).filter(models.Bank.id == account_id).first()
    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")

    db.delete(acc)
    db.commit()
    return {"message": "Account deleted"}

# ---------------- DEPOSIT ----------------

@app.put("/accounts/{account_id}/deposit")
def deposit(account_id: int, tx: Transaction, db: db_dependency):
    acc = db.query(models.Bank).filter(models.Bank.id == account_id).first()

    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")

    if tx.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")

    acc.balance += tx.amount
    db.commit()
    db.refresh(acc)

    return {"message": "Deposit success", "balance": acc.balance}

# ---------------- WITHDRAW ----------------

@app.put("/accounts/{account_id}/withdraw")
def withdraw(account_id: int, tx: Transaction, db: db_dependency):
    acc = db.query(models.Bank).filter(models.Bank.id == account_id).first()

    if not acc:
        raise HTTPException(status_code=404, detail="Account not found")

    if tx.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")

    if acc.balance < tx.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")

    acc.balance -= tx.amount
    db.commit()
    db.refresh(acc)

    return {"message": "Withdraw success", "balance": acc.balance}

# ---------------- TRANSFER ----------------

@app.post("/transfer")
def transfer(data: Transfer, db: db_dependency):
    from_acc = db.query(models.Bank).filter(models.Bank.id == data.from_id).first()
    to_acc = db.query(models.Bank).filter(models.Bank.id == data.to_id).first()

    if not from_acc or not to_acc:
        raise HTTPException(status_code=404, detail="Account not found")

    if data.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")

    if from_acc.balance < data.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")

    from_acc.balance -= data.amount
    to_acc.balance += data.amount

    db.commit()

    return {
        "message": "Transfer successful",
        "from_balance": from_acc.balance,
        "to_balance": to_acc.balance
    }

# ---------------- REGISTER ----------------

@app.post("/register")
def register(user: RegisterUser):
    print(user)
    return {"message": "Account created successfully"}
// ─── STATE ENGINE CONFIG ───
let currentUser = null;
let currentRemitBank = "ABS-CBN Internal";
let activeLoanInterestRate = 0.05; 
let activeLoanCategoryName = "Personal Credit";

// Global sandbox records repository
let localDbUsers = {};

// Page View Management Routing Channels System Hooks
function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) target.classList.add('active');
  
  if (pageId === 'page-dashboard' && currentUser) {
    hydrateDashboardData();
  }
}

// Global Core Auth Routing Engine Functions
function handleLogin() {
  const uInput = document.getElementById('loginUsername').value.trim();
  const pInput = document.getElementById('loginPassword').value;

  if (!uInput || !pInput) {
    alert("Authentication Failure: Username string vectors and password tokens cannot be empty parameters.");
    return;
  }

  // Lookup parameters matching or pass down sandbox baseline defaults tracking structure
  if (localDbUsers[uInput]) {
    if (localDbUsers[uInput].password === pInput) {
      currentUser = localDbUsers[uInput];
    } else {
      alert("Security Error: Invalid passphrase matching key signature metrics.");
      return;
    }
  } else {
    // Generate immediate runtime configuration fallback baseline objects allocation
    currentUser = {
      username: uInput,
      firstName: uInput.split('@')[0],
      lastName: "Kapamilya",
      birthday: "2000-01-01",
      balance: 75000.00,
      accountNumber: "9812-4012-74",
      accountType: "Savings Yield Max"
    };
    localDbUsers[uInput] = currentUser;
  }

  switchPage('page-dashboard');
}

function handleRegister() {
  const fName = document.getElementById('regFirst').value.trim();
  const lName = document.getElementById('regLast').value.trim();
  const bDay = document.getElementById('regBirthday').value;
  const initialDep = parseFloat(document.getElementById('regDeposit').value);
  const accType = document.getElementById('regType').value;
  const pass = document.getElementById('regPassword').value;

  if (!fName || !lName || !bDay || isNaN(initialDep) || !pass) {
    alert("Validation Fault: Complete all structured criteria fields before executing electronic register transactions.");
    return;
  }

  if (initialDep < 5000) {
    alert("Deposit Constraint: System protocols mandate ₱5,000 baseline initial capital injection threshold parameters.");
    return;
  }

  // Parameter calculation check rule validations logic
  const birthYear = new Date(bDay).getFullYear();
  const currentYear = new Date().getFullYear();
  if ((currentYear - birthYear) < 18) {
    alert("Age Rejection: Underage exception parameters caught. Primary applicant must verify at least 18 indexing slots.");
    return;
  }

  const generatedUserToken = (fName.charAt(0) + lName).toLowerCase() + "@abscbn.bank";
  const mockAccountNumberString = Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(10 + Math.random() * 90);

  currentUser = {
    username: generatedUserToken,
    firstName: fName,
    lastName: lName,
    birthday: bDay,
    balance: initialDep,
    accountNumber: mockAccountNumberString,
    accountType: accType,
    password: pass
  };

  localDbUsers[generatedUserToken] = currentUser;
  alert(`Registration complete! Your secure generated login access identifier signature token is: ${generatedUserToken}`);
  switchPage('page-dashboard');
}

function updateUploadLabel(inputEl) {
  const lbl = document.getElementById('uploadText');
  if (inputEl.files && inputEl.files[0]) {
    lbl.textContent = `Attached: ${inputEl.files[0].name} (Staged ready for ingestion)`;
    lbl.style.color = "var(--teal)";
  }
}

function handleLogout() {
  currentUser = null;
  switchPage('page-login');
}

// Dashboard Injection Rendering Engine Controls
function hydrateDashboardData() {
  if (!currentUser) return;

  const formattedPhpStr = formatCurrencyCurrency(currentUser.balance);
  const initialsToken = (currentUser.firstName.charAt(0) + currentUser.lastName.charAt(0)).toUpperCase();

  // Overview node injections
  document.getElementById('userDisplay').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  document.getElementById('dashGreeting').textContent = currentUser.firstName;
  document.getElementById('avatarInitial').textContent = initialsToken;
  document.getElementById('avatarInitial2').textContent = initialsToken;
  document.getElementById('dashBalance').textContent = formattedPhpStr;
  document.getElementById('dashAccNum').textContent = currentUser.accountNumber;
  document.getElementById('dashType').textContent = currentUser.accountType;

  // Render peripheral metrics modules counters
  document.getElementById('auditBalance').textContent = formattedPhpStr;
  document.getElementById('profName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  document.getElementById('profAvatar').textContent = initialsToken;
  document.getElementById('profAccNum').textContent = currentUser.accountNumber;
  document.getElementById('profType').textContent = currentUser.accountType;
  document.getElementById('profSub').textContent = `Birthday: ${currentUser.birthday} | Authenticated Channel Partner`;
  
  // Calculate automated relative yield projection arrays thresholds metrics parameters
  const variableYieldResult = currentUser.balance * 0.035 / 12;
  document.getElementById('statYield').textContent = formatCurrencyCurrency(variableYieldResult);

  renderListTablesLedgers();
}

function formatCurrencyCurrency(num) {
  return "₱" + num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderListTablesLedgers() {
  const containerOverviewList = document.getElementById('dashTxList');
  const containerFullHistoryBody = document.getElementById('historyTableBody');
  
  if (!containerOverviewList || !containerFullHistoryBody) return;

  containerOverviewList.innerHTML = "";
  containerFullHistoryBody.innerHTML = "";

  transactionLedgerHistory.forEach(item => {
    // 1. Append into overview dashboard summary nodes list tracking metrics module
    const signFlag = item.type === "CREDIT" ? "+" : "-";
    const classFlag = item.type === "CREDIT" ? "credit" : "debit";
    const inlineSvgSelectorIcon = item.type === "CREDIT" 
      ? `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>`
      : `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>`;
    const bgColorFlag = item.type === "CREDIT" ? "icon-green" : "icon-blue";

    const liOverviewElement = document.createElement('li');
    liOverviewElement.className = "tx-item";
    liOverviewElement.innerHTML = `
      <div class="tx-icon ${bgColorFlag}">${inlineSvgSelectorIcon}</div>
      <div class="tx-info">
        <div class="tx-name">${item.sector}</div>
        <div class="tx-date">${item.timestamp}</div>
      </div>
      <div class="tx-amount ${classFlag}">${signFlag} ${formatCurrencyCurrency(item.volume)}</div>
    `;
    containerOverviewList.appendChild(liOverviewElement);

    // 2. Map data elements rows strings inside primary full accounting parameters panel table
    const trRow = document.createElement('tr');
    trRow.innerHTML = `
      <td style="padding:12px 8px; border-bottom:1px solid var(--gray-100);">${item.timestamp}</td>
      <td style="padding:12px 8px; border-bottom:1px solid var(--gray-100); font-weight:500;">${item.sector}</td>
      <td style="padding:12px 8px; border-bottom:1px solid var(--gray-100);"><span class="stat-change ${item.type === 'CREDIT' ? 'up':'down'}">${item.type}</span></td>
      <td style="padding:12px 8px; border-bottom:1px solid var(--gray-100); text-align:right; font-weight:600;" class="${classFlag}">${signFlag} ${formatCurrencyCurrency(item.volume)}</td>
    `;
    containerFullHistoryBody.appendChild(trRow);
  });
}

// Router controllers for specific sub sections panel items lists
function activateSection(sectionId, elementTrigger) {
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => btn.classList.remove('active'));
  if (elementTrigger) elementTrigger.classList.add('active');

  document.querySelectorAll('.section-panel').forEach(pane => pane.classList.remove('active'));
  const targetedPaneNode = document.getElementById(`view-${sectionId}`);
  if (targetedPaneNode) targetedPaneNode.classList.add('active');

  // Dynamically re-title header tracking system bars components
  const titles = {
    overview: 'Overview Console',
    transfer: 'Transfer Money',
    savings: 'Savings',
    loan: 'Loan Application',
    withdraw: 'Withdraw',
    balance: 'Check Balance',
    history: 'Transaction History',
    profile: 'My Profile'
  };
  const el = document.getElementById('pageTitle');
  if (el) el.textContent = titles[sectionId] || sectionId;
  closeSidebar();
}

function triggerQuickAction(sectionId) {
  const matchedNavButton = Array.from(document.querySelectorAll('.sidebar-nav .nav-item')).find(btn => btn.textContent.toLowerCase().includes(sectionId.toLowerCase()));
  activateSection(sectionId, matchedNavButton);
}

// Sidebar toggle (mobile interface constraints helper methods)
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('open');
}

// Topbar Date allocation algorithm module handler logic
const dateEl = document.getElementById('topbarDate');
if (dateEl) {
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString('en-PH', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

// Chip toggles selection mapping logic frameworks
document.querySelectorAll('.bank-chip, .amount-chip, .filter-chip, .method-card').forEach(chip => {
  chip.addEventListener('click', function() {
    const group = this.parentElement.querySelectorAll('.bank-chip, .amount-chip, .filter-chip, .method-card');
    group.forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
  });
});

// Interbank Transfer Framework Operations Logic Functions Methods Blocks
function selectBankChip(element, bankNameString) {
  currentRemitBank = bankNameString;
  document.getElementById('sideBank').textContent = bankNameString;
  updateTransferSummary();
}

function proceedTransferStep(stepNumber) {
  document.getElementById('transPane1').style.display = stepNumber === 1 ? 'block' : 'none';
  document.getElementById('transPane2').style.display = stepNumber === 2 ? 'block' : 'none';
  document.getElementById('transPane3').style.display = stepNumber === 3 ? 'block' : 'none';

  document.querySelectorAll('.step-bar .step').forEach((st, idx) => {
    st.classList.remove('active', 'done');
    if ((idx + 1) < stepNumber) st.classList.add('done');
    if ((idx + 1) === stepNumber) st.classList.add('active');
  });

  if (stepNumber === 3) {
    constamtVal = parseFloat(document.getElementById('transAmount').value) || 0;
    document.getElementById('reviewAmount').textContent = formatCurrencyCurrency(amtVal);
    document.getElementById('reviewBank').textContent = currentRemitBank;
    document.getElementById('reviewAcc').textContent = document.getElementById('transAccNum').value || "Not set";
  }
}

function setTransAmount(numericVal) {
  const currentVal = parseFloat(document.getElementById('transAmount').value) || 0;
  document.getElementById('transAmount').value = currentVal + numericVal;
  updateTransferSummary();
}

function updateTransferSummary() {
  const inputAmt = parseFloat(document.getElementById('transAmount').value) || 0;
  const targetAcc = document.getElementById('transAccNum').value || "Not set";
  const interBankServiceFeeThreshold = currentRemitBank === "ABS-CBN Internal" ? 0.00 : 15.00;
  const totalCalculatedDebitManifestValue = inputAmt + interBankServiceFeeThreshold;

  document.getElementById('sideAcc').textContent = targetAcc;
  document.getElementById('sideSub').textContent = formatCurrencyCurrency(inputAmt);
  document.getElementById('sideFee').textContent = formatCurrencyCurrency(interBankServiceFeeThreshold);
  document.getElementById('sideTotal').textContent = formatCurrencyCurrency(totalCalculatedDebitManifestValue);
}

function executeRemittance() {
  const transferVolumeAmount = parseFloat(document.getElementById('transAmount').value) || 0;
  const fee = currentRemitBank === "ABS-CBN Internal" ? 0.00 : 15.00;
  const grandTotalRequiredDebitCapital = transferVolumeAmount + fee;

  if (transferVolumeAmount <= 0) {
    alert("Remittance Denied: Allocation amount parsing validation rule broken.");
    return;
  }

  if (currentUser.balance < grandTotalRequiredDebitCapital) {
    alert("Insufficient Reserves: Operational capital requested exceeds current balance allocation limit.");
    return;
  }

  // Commit operation ledger balance deduction entries records
  currentUser.balance -= grandTotalRequiredDebitCapital;
  
  const d = new Date();
  const timestampString = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,'0') + "-" + String(d.getDate()).padStart(2,'0') + " " + String(d.getHours()).padStart(2,'0') + ":" + String(d.getMinutes()).padStart(2,'0');
  
  transactionLedgerHistory.unshift({
    timestamp: timestampString,
    sector: `Remit Out: [${currentRemitBank}]`,
    type: "DEBIT",
    volume: transferVolumeAmount
  });

  alert(`Remittance Authorization Granted! Dispatched ${formatCurrencyCurrency(transferVolumeAmount)} out successfully via clearing networks.`);
  
  // Clear layout fields resetting system router console
  document.getElementById('transAmount').value = "";
  document.getElementById('transAccNum').value = "";
  proceedTransferStep(1);
  hydrateDashboardData();
  triggerQuickAction('overview');
}

// Automated Cardless Dispenser ATM Methods Logics Blocks System Execution Tasks
function setWithdrawVal(numValue) {
  document.getElementById('txtWithdrawCustom').value = numValue;
}

function executeAtmWithdrawal() {
  const withdrawalVolume = parseFloat(document.getElementById('txtWithdrawCustom').value) || 0;
  
  if (withdrawalVolume <= 0 || withdrawalVolume % 100 !== 0) {
    alert("ATM Operational Failure: Dispense parameters string must map accurately directly onto base ₱100 integer threshold note configurations values scaling.");
    return;
  }

  if (currentUser.balance < withdrawalVolume) {
    alert("Transaction Rejection: Cash extraction value exceeds liquid ledger balance limitations indicators parameters.");
    return;
  }

  currentUser.balance -= withdrawalVolume;
  const now = new Date();
  const timestampString = now.getFullYear() + "-" + String(now.getMonth()+1).padStart(2,'0') + "-" + String(now.getDate()).padStart(2,'0') + " " + String(now.getHours()).padStart(2,'0') + ":" + String(now.getMinutes()).padStart(2,'0');

  transactionLedgerHistory.unshift({
    timestamp: timestampString,
    sector: "ATM Cardless Cash",
    type: "DEBIT",
    volume: withdrawalVolume
  });

  alert(`Dispenser Activated successfully! Retain physical confirmation voucher log. Extracted value: ${formatCurrencyCurrency(withdrawalVolume)} successfully.`);
  document.getElementById('txtWithdrawCustom').value = "";
  hydrateDashboardData();
  triggerQuickAction('overview');
}

// Parametric Loan Estimation Matrix Multi-Tier Computation Framework
function selectLoanType(elementDomNode, numericInterestRateScalar, textCategoryLabelNameString) {
  document.querySelectorAll('.loan-type').forEach(card => card.classList.remove('selected'));
  elementDomNode.classList.add('selected');

  activeLoanInterestRate = numericInterestRateScalar;
  activeLoanCategoryName = textCategoryLabelNameString;
  calculateLoanSystem();
}

function calculateLoanSystem() {
  const inputPrincipalValueAllocation = parseFloat(document.getElementById('rngPrincipal').value) || 0;
  const inputAmortizationDurationMonths = parseInt(document.getElementById('rngMonths').value) || 12;

  document.getElementById('lblLoanPrincipal').textContent = formatCurrencyCurrency(inputPrincipalValueAllocation);
  document.getElementById('lblLoanMonths').textContent = `${inputAmortizationDurationMonths} Months`;

  // Compute standard baseline amortized total evaluation formulas logic tracking system variables matrices
  const cumulativeInterestBurdenCostSum = inputPrincipalValueAllocation * activeLoanInterestRate * (inputAmortizationDurationMonths / 12);
  const aggregateGrossObligationReturnAmountValue = inputPrincipalValueAllocation + cumulativeInterestBurdenCostSum;
  const periodicMonthlyInstallmentLiabilityPaymentAmount = aggregateGrossObligationReturnAmountValue / inputAmortizationDurationMonths;

  document.getElementById('breakdownMonthly').textContent = formatCurrencyCurrency(periodicMonthlyInstallmentLiabilityPaymentAmount);
  document.getElementById('breakdownCat').textContent = activeLoanCategoryName;
  document.getElementById('breakdownRate').textContent = `${(activeLoanInterestRate * 100).toFixed(1)}% Fixed APR`;
  document.getElementById('breakdownInterest').textContent = formatCurrencyCurrency(cumulativeInterestBurdenCostSum);
}

function submitLoanApplication() {
  const principalAppliedValueText = parseFloat(document.getElementById('rngPrincipal').value) || 0;
  alert(`Electronic Vault Query Dispatched! Electronic Verification request filed for standard capital deployment framework mapping index: ${formatCurrencyCurrency(principalAppliedValueText)} inside automated registry system queue.`);
}

function filterHistoryLedger(filterCriteriaTagValueString, elementDomNodeContextPointer) {
  // Toggle selection highlight nodes styling components tracking items systems rules layout lists elements properties tabs parameters
  const tabParentChipsContainer = elementDomNodeContextPointer.parentElement;
  tabParentChipsContainer.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('selected'));
  elementDomNodeContextPointer.classList.add('selected');

  const targetLedgerRowsCollection = document.getElementById('historyTableBody').querySelectorAll('tr');
  
  targetLedgerRowsCollection.forEach((rowElementItem) => {
    const textStatusVectorString = rowElementItem.querySelector('.stat-change').textContent.trim().toUpperCase();
    if (filterCriteriaTagValueString === "ALL") {
      rowElementItem.style.display = "table-row";
    } else if (filterCriteriaTagValueString === "CREDIT" && textStatusVectorString === "CREDIT") {
      rowElementItem.style.display = "table-row";
    } else if (filterCriteriaTagValueString === "DEBIT" && textStatusVectorString === "DEBIT") {
      rowElementItem.style.display = "table-row";
    } else {
      rowElementItem.style.display = "none";
    }
  });
}

// Complete default runtime initialization layout configurations hydration sequence pipeline
calculateLoanSystem();
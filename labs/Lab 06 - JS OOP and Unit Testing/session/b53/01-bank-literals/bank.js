export let accounts = [
  {
    accountNo: 123,
    balance: 500,
    type: "Savings",
  },
  {
    accountNo: 234,
    balance: 4000,
    type: "Current",
  },
  {
    accountNo: 345,
    balance: 35000,
    type: "Current",
  },
  {
    accountNo: 456,
    balance: 60000,
    type: "Savings",
  },
];

export function deposit(accountNo, amount) {
  // validate the amount
  if (amount <= 0) {
    return;
  }

  // find the index of the account
  // const index = accounts.map((acc) => acc.accountNo).indexOf(accountNo);
  const index = accounts.findIndex((acc) => acc.accountNo === accountNo);

  // update the corresponding balance
  if (index !== -1) {
    accounts[index].balance += amount;
  }
}

export function withdraw(accountNo, amount) {
  // validate the amount
  if (amount <= 0) {
    return;
  }

  // find the index of the account
  const index = accounts.findIndex((acc) => acc.accountNo === accountNo);

  // update the corresponding balance
  if (index !== -1) {
    if (accounts[index].balance >= amount) {
      accounts[index].balance -= amount;
    }
  }
}

export function add(account) {
  if (account.accountNo && account.balance && account.type) {
    accounts.push(account);
  }
}

export function getAccount(accountNo) {
  return accounts.find((acc) => acc.accountNo === accountNo);
}

export function deleteAccount(accountNo) {
  // accounts = accounts.filter(acc => acc.accountNo !== accountNo);

  const index = accounts.findIndex((acc) => acc.accountNo === accountNo);
  if (index !== -1) {
    accounts.splice(index, 1);

    // delete accounts[index];
  }
}

export function totalBalance() {
  return accounts.reduce((acc, val) => acc + val.balance, 0);
}

export function avgBalance() {
  return totalBalance() / accounts.length;
}

export function distributeBenefit(benefitPercentage) {
  accounts.forEach((acc) => {
    if (acc.type === "Savings") {
      acc.balance *= 1 + benefitPercentage;
    }
  });
}

export function deductFee(monthlyFee) {
  accounts.forEach((acc) => {
    if (acc.type === "Current") {
      acc.balance -= monthlyFee;
    }
  });
}

function toJSON() {
  return JSON.stringify(accounts);
}

function fromJSON(str) {
  accounts = JSON.parse(str);
}

export { toJSON, fromJSON };
// export default accounts;

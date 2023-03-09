export const accounts = [
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
  // verify amount
  if (amount <= 0) {
    console.error("Invalid amount");
    return;
  }

  // find account
  const index = accounts.findIndex((acc) => accountNo === acc.accountNo);

  // update account balance
  if (index !== -1) {
    accounts[index].balance += amount;
  }
}

export function withdraw(accountNo, amount) {
  // verify amount
  if (amount <= 0) {
    console.error("Invalid amount");
    return;
  }

  // find account
  const index = accounts.findIndex((acc) => accountNo === acc.accountNo);

  // update account balance
  if (index !== -1) {
    // assuming no negative balances allowed
    if (accounts[index].balance >= amount) {
      accounts[index].balance -= amount;
    }
  }
}

export function add(account) {
  // if (account.accountNo && account.balance && account.type) {
  accounts.push(account);
  // }
}

export function getAccount(accountNo) {
  return accounts.find((acc) => accountNo === acc.accountNo);
}

export function deleteAccount(accountNo) {
  // first method: using filter
  accounts = accounts.filter((acc) => accountNo !== acc.accountNo);

  // second method: using splice
  const index = accounts.findIndex((acc) => accountNo === acc.accountNo);
  if (index !== -1) {
    accounts.splice(index, 1);
    // delete accounts[index];
  }
}

export function totalBalance() {
  return accounts.reduce((sum, obj) => sum + obj.balance, 0);
}

export function avgBalance() {
  if (accounts.length) {
    return totalBalance() / accounts.length;
  } else {
    return 0;
  }
}

export function distributeBenefit(benefitPercentage) {
  accounts.map((acc) => {
    if (acc.type === "Savings") {
      acc.balance *= 1 + benefitPercentage;
    }
  });
}

export function deductFee(monthlyFee) {
  accounts.map((acc) => {
    if (acc.type === "Current") {
      acc.balance -= monthlyFee;
    }
  });
}

export function toJSON() {
  return JSON.stringify(accounts);
}

export function fromJSON(accs) {
  accounts = JSON.parse(accs);
}

// export {toJSON, fromJSON}
// export default accounts;

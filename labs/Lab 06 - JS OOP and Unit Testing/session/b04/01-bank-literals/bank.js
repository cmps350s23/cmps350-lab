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
  if (amount <= 0) {
    return;
  }

  const account = accounts.find((a) => a.accountNo === accountNo);
  if (account) {
    account.balance += amount;
  }

  const index = accounts.findIndex((a) => a.accountNo === accountNo);
  if (index !== -1) {
    accounts[index].balance += amount;
  }

  accounts.forEach((a) => {
    if (a.accountNo === accountNo) {
      a.balance += amount;
    }
  });
}

export function withdraw(accountNo, amount) {
  if (amount <= 0) {
    return;
  }

  const account = accounts.find((a) => a.accountNo === accountNo);
  if (account && account.balance >= amount) {
    account.balance -= amount;
  }
}

export function add(account) {
  if (["accountNo", "balance", "type"].every((prop) => prop in account)) {
    accounts.push(account);
  }
}

export function getAccount(accountNo) {
  return accounts.find((a) => a.accountNo === accountNo);
}

export function deleteAccount(accountNo) {
  // const account = accounts.find((a) => a.accountNo === accountNo);

  const index = accounts.findIndex((a) => a.accountNo === accountNo);
  if (index !== -1) {
    // delete accounts[index];
    accounts.splice(index, 1);
  }

  // accounts = accounts.filter((a) => a.accountNo !== accountNo);
}

export function avgBalance() {
  return totalBalance() / accounts.length;
}

export function totalBalance() {
  return accounts.reduce((sum, account) => sum + account.balance, 0);
}

export function distributeBenefit(benefitPercentage) {
  accounts.forEach((acc) => {
    if (acc.type === "Savings") {
      acc.balance *= 1 + benefitPercentage;
    }
  });

  // accounts
  //   .filter((a) => a.type === "Savings")
  //   .forEach((a) => {
  //     a.balance *= 1 + benefitPercentage;
  //   });
}

export function deductFee(monthlyFee) {
  accounts.forEach((acc) => {
    if (acc.type === "Current") {
      acc.balance -= monthlyFee;
    }
  });
}

export function toJSON() {
  return JSON.stringify(accounts);
}

export function fromJSON(text) {
  return JSON.parse(text);
}

// const prop = "balance";
// account[prop];

// export { toJSON, fromJSON };
export default accounts;

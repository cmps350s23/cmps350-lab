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

  // const index = accounts.findIndex((a) => a.accountNo === accountNo);
  // if (index !== -1) {
  //   accounts[index].balance += amount;
  // }

  // accounts.forEach((a) => {
  //   if (a.accountNo == accountNo) {
  //     a.balance += amount;
  //   }
  // });
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
  if (
    account &&
    ["accountNo", "balance", "type"].every((key) => key in account)
  ) {
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
    accounts.splice(index, 1);
  }

  // accounts = accounts.filter((a) => a.accountNo !== accountNo);
}

export function totalBalance() {
  return accounts.reduce((tot, acc) => tot + acc.balance, 0);
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

export function toJSON() {
  return JSON.stringify(accounts);
}

export function fromJSON(str) {
  return JSON.parse(str);
}

// add({ accountNo: null, balance: null, type: null });
// console.log(accounts);
// deleteAccount(345);
// console.log(accounts);

// const obj = { a: 1, b: 2 };
// delete obj["b"];
// console.log(obj);

// export { accounts, add };
export default accounts;

// const a = [];
// const b = [];

// stringify({a, b})

import * as Bank from "./bank.js";

console.log(Bank.accounts);
console.log(Bank.toJSON());

Bank.add({
  accountNo: 111,
  balance: 122122,
  type: "Savings",
});
Bank.add({
  accountNo: 999,
  balance: 7778,
  type: "Current",
});
Bank.add({
  accountNo: 667,
  balance: 987,
  type: "Savings",
});
console.log(Bank.accounts);

Bank.deposit(111, 10000);
Bank.withdraw(456, 1000);
console.log(Bank.accounts);

Bank.deductFee(10);
console.log("Total balance:", Bank.totalBalance());

Bank.distributeBenefit(0.06);
console.log(Bank.accounts);

console.log(Bank.toJSON());

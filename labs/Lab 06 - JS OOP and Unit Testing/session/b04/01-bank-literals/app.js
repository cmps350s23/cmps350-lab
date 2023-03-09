import * as Bank from "./bank.js";

console.log(Bank.accounts);

Bank.add({
  accountNo: 111,
  balance: 500,
  type: "Savings",
});

Bank.add({
  accountNo: 999,
  balance: 4000,
  type: "Current",
});

Bank.deposit(123, 500);
Bank.deposit(234, 500);

Bank.withdraw(345, 1000);
Bank.withdraw(456, 1000);

Bank.deductFee(10);
console.log(Bank.totalBalance());

Bank.distributeBenefit(0.06);
console.log(Bank.totalBalance());

console.log(Bank.toJSON());
console.log(Bank.fromJSON(Bank.toJSON()));
// console.log(Bank.accounts);

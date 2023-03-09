import * as Bank from "./bank.js";

Bank.add({ accountNo: 100, balance: 0, type: "Current" });
Bank.add({ accountNo: 999, balance: 10000, type: "Savings" });
Bank.deposit(123, 1000);
Bank.deposit(234, 4500);
Bank.withdraw(345, 25000);
Bank.withdraw(456, 59000);
Bank.deductFee(10);
console.log("Total balance:", Bank.totalBalance().toLocaleString());
Bank.distributeBenefit(0.6);
console.log("Total balance:", Bank.totalBalance().toLocaleString());
console.log(Bank.accounts);
console.log(Bank.toJSON());
console.log(Bank.fromJSON(Bank.toJSON()));

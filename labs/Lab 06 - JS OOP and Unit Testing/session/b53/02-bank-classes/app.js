import { BankAccount } from "./bank-account.js";
import { SavingsAccount } from "./savings-account.js";
import { CurrentAccount } from "./current-account.js";
import { Bank } from "./bank.js";

const details = [
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

const accounts = details.map((detail) =>
  detail.type === "Savings"
    ? new SavingsAccount(detail.balance)
    : new CurrentAccount(detail.balance)
);
// console.log(accounts.map((acc) => acc.toString()));

const bank = new Bank();
accounts.forEach((acc) => bank.add(acc));
console.log(bank.toString());

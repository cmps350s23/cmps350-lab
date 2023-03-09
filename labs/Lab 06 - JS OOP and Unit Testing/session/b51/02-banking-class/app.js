import { BankAccount } from "./bank-account.js";
import { SavingsAccount } from "./savings-account.js";
import { CurrentAccount } from "./current-account.js";
import { Bank } from "./bank.js";

const balances = [1000, 4000, 3500];
const accounts = balances.map((balance) => new BankAccount(balance));
const savingsAccounts = balances.map((balance) => new SavingsAccount(balance));

// console.log(accounts.map((acc) => acc.toString()));
// console.log(savingsAccounts.map((acc) => acc.toString()));

export const accs = [
  {
    balance: 500,
    type: "Savings",
  },
  {
    balance: 4000,
    type: "Current",
  },
  {
    balance: 35000,
    type: "Current",
  },
  {
    balance: 60000,
    type: "Savings",
  },
];

const bank = new Bank();
accs.forEach((acc) =>
  bank.add(
    acc.type === "Current"
      ? new CurrentAccount(acc.balance)
      : new SavingsAccount(acc.balance)
  )
);

console.log(bank.toString());
console.log("Total balance:", bank.totalBalance());
CurrentAccount.setMonthlyFee(0);

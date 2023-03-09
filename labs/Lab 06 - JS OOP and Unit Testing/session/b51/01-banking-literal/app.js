import * as Bank from "./bank.js";
import { tsJSON, fromJSON } from "./bank.js";

console.log(Bank.accounts);
Bank.distributeBenefit(10);
console.log(Bank.accounts);
Bank.deductFee(5);
console.log(Bank.accounts);

// console.log(Bank.accounts.map((acc) => ({ balance: acc.balance })));
console.log(Bank.toJSON(Bank.accounts));

import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/accounts.json";

// CRUD: create read update delete

// async function initialize() {}

export async function createAccount(obj) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);

  const account = {
    ...obj,
    id: nanoid(),
    createdat: new Date(),
  };
  accounts.push(account);

  await fs.writeFile(path, JSON.stringify(accounts));
  return account;
}

export async function readAccounts(type) {
  // const data = fs.readFileSync(path);
  // const data = fs.readFile(path, options, callback);
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);

  if (type) {
    accounts = accounts.filter((account) => account.type === type);
  }

  return accounts;
}

export async function readAccount(id) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);

  const account = accounts.find((account) => account.id === id);
  return account;
}

export async function updateAccount(id, account) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);

  const index = accounts.findIndex((account) => account.id === id);

  if (index !== -1) {
    // accounts[index] = { ...accounts[index], ...account };
    if ("balance" in account) {
      accounts[index].balance = account.balance;
    }
    if ("type" in account) {
      accounts[index].type = account.type;
    }

    await fs.writeFile(path, JSON.stringify(accounts));
    return accounts[index];
  }

  return null;
}

export async function deleteAccount(id) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);

  const index = accounts.findIndex((account) => account.id === id);

  if (index !== -1) {
    const account = accounts[index];
    accounts.splice(index, 1);

    await fs.writeFile(path, JSON.stringify(accounts));
    return account;
  }

  return null;
}

export async function readTransactions(accountid) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);

  const account = accounts.find((account) => account.id === accountid);
  return account?.transactions;
}
export async function createTransaction(accountid, obj) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);

  const account = accounts.find((account) => account.id === accountid);

  if (account) {
    if (obj.type === "w" && account.balance < obj.amount) {
      // return { result: message.INSUFFICIENT_FUNDS };
      return null;
    }

    // create transaction
    await fs.writeFile(path, JSON.stringify(accounts));
    // return { result: message.SUCCESS, payload: transaction };
  } else {
    return false;
    // return { result: message.ACCOUNT_NOT_FOUND };
  }
}

// const message = {
//   ACCOUNT_NOT_FOUND: 0,
//   INSUFFICIENT_FUNDS: 1,
//   SUCCESS: 2,
// };

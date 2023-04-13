import { promises as fs } from "fs";
import { nanoid } from "nanoid";

const path = "data/accounts.json";

// CRUD: create read update delete

export async function createAccount(account) {
  const data = await fs.readFile(path);
  const accounts = JSON.parse(data);

  account = { ...account, id: nanoid(), createdat: new Date() };
  accounts.push(account);
  await fs.writeFile(path, JSON.stringify(accounts));
  return account;
}

export async function readAccounts(type) {
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

  return accounts.find((account) => account.id === id);
}

export async function updateAccount(id, body) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);
  let account = accounts.find((a) => a.id === id);

  if (account) {
    account = { ...account, ...body };
    // account.balance = body.balance;
    // account.type = body.type;
    await fs.writeFile(path, JSON.stringify(accounts));
  }

  return account;
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

export async function createTransaction(accountid, body) {
  const data = await fs.readFile(path);
  const accounts = JSON.parse(data);
  const account = accounts.find((account) => account.id === accountid);

  if (account) {
    // perform the transaction
    return transaction;

    // fail if insufficient balance
    return false;
  }

  return null;

  // const status = {
  //   SUCCESS: 0,
  //   FAIL: 1,
  //   ACCOUNT_NOT_FOUND: 2,
  // };

  // return {
  //   status:
  //   transaction.SUCCESS,
  //   transaction.FAIL,
  //   transaction.ACCOUNT_NOT_FOUND

  //   payload: ,
  // }
}

export async function readTransactions(accountid) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);
  const account = accounts.find((account) => account.id === accountid);

  if (account) {
    return account.transactions;
  }

  return null;
}

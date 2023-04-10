import { promises as fs } from "fs";
import { nanoid } from "nanoid";
// CRUD: create read update delete

const path = "data/accounts.json";

export async function createAccount(account) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);

  const id = nanoid();
  account = { ...account, id, createdat: new Date() };
  accounts.push(account);

  await fs.writeFile(path, JSON.stringify(accounts));
  return account;
}

export async function readAccounts(type) {
  const data = await fs.readFile("data/accounts.json");
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

export async function updateAccount(account) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);

  const index = accounts.findIndex((a) => a.id === account.id);
  if (index !== -1) {
    accounts[index] = { ...accounts[index], ...account };

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

export async function readTransactions(id) {}

export async function createTransaction(id, transaction) {}

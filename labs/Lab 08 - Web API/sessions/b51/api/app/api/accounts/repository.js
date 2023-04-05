import { promises as fs } from "fs";
import { nanoid } from "nanoid";
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

  return account.filter((account) => account.id === id);
}

export async function updateAccount(account) {
  const data = await fs.readFile(path);
  let accounts = JSON.parse(data);

  await fs.writeFile(path, JSON.stringify(accounts));
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

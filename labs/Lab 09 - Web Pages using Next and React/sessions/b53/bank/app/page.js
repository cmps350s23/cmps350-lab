import styles from "./page.module.css";
import * as repo from "../utilities/repository.js";
import Link from "next/link";

export default async function Home({ searchParams }) {
  // const accounts = await repo.readAccounts();
  // console.log(accounts);

  const { type, action, id } = searchParams;

  if (action === "delete") {
    const res = await fetch(`http://localhost:3001/api/accounts/${id}`, {
      method: "delete",
    });
    await res.json();
  }

  const res = await fetch(
    "http://localhost:3001/api/accounts" + (type ? `?type=${type}` : ``),
    { cache: "no-store" }
  );
  const accounts = await res.json();

  return (
    <>
      <h2>Accounts</h2>
      {/* <select id="type">
        <option value="">All</option>
        <option value="current">Current</option>
        <option value="savings">Savings</option>
      </select> */}
      <Link href="">All</Link>
      <Link href="?type=current">Current</Link>
      <Link href="?type=savings">Savings</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Balance</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.balance}</td>
              <td>{account.type}</td>
              <td>
                <Link href={`?action=delete&id=${account.id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <script src="script1.js"></script> */}
    </>
  );
}

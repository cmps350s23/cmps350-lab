// "use client";

import Link from "next/link";

// import { redirect } from "next/navigation";
import * as repo from "@/utilities/repository.js";

export default async function Accounts({ params, searchParams }) {
  const { action, type, id } = searchParams;

  if (action === "delete" && id) {
    console.log(action, id);
    await repo.deleteAccount(id);
  }

  // repo
  const accounts = await repo.readAccounts(type);

  // fetch
  // const accounts = await fetch("http://localhost:3000/api/accounts").then(
  //   (res) => res.json()
  // );

  // redirect("index.html");

  return (
    <>
      <h2>Accounts</h2>
      {/* <select id="type" onChange={(e) => alert(e.target.value)}> */}
      {/* <select id="type">
        <option value="">All</option>
        <option value="current">Current</option>
        <option value="savings">Savings</option>
      </select> */}
      <Link href="">All</Link>
      <Link href="/?action=filter&type=current">Current</Link>
      <Link href="/?action=filter&type=savings">Savings</Link>
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
                <Link
                  href={`/?action=delete&id=${account.id}&${
                    type !== undefined ? "type=" + type : ""
                  }`}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <script src="script-client.js"></script> */}
    </>
  );
}

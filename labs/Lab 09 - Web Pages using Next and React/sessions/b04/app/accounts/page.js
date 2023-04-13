// "use client";

export const metadata = {
  title: "Green Bank - Accounts",
};

import Link from "next/link";
import * as repo from "@/utilities/repository.js";

export default async function Home({ params, searchParams }) {
  const { action, type, id } = searchParams;

  if (action === "delete" && id) {
    await repo.deleteAccount(id);
  }

  let accounts;

  if (type) {
    accounts = await repo.readAccounts(type);
  } else {
    accounts = await repo.readAccounts();
  }

  // const accounts = await fetch("http://localhost:3000/api/accounts").then(
  //   (res) => res.json()
  // );

  return (
    <>
      <h2>Accounts</h2>
      {/* <select name="type" id="type" onChange={(e) => alert(e.target.value)}> */}
      <select name="type" id="type">
        <option value="">All</option>
        <option value="current">Current</option>
        <option value="savings">Savings</option>
      </select>
      <ul>
        <li>
          <Link href="/accounts?action=filter">All</Link>
        </li>
        <li>
          <Link href="/accounts?action=filter&type=current">Current</Link>
        </li>
        <li>
          <Link href="/accounts?action=filter&type=savings">Savings</Link>
        </li>
      </ul>
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
          {accounts.map((a) => (
            // <Account key={a.id} id={a.id} balance={a.balance} type={a.type} />
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.balance}</td>
              <td>{a.type}</td>
              <td>
                <Link
                  href={`/accounts?action=delete&id=${a.id}&${
                    type ? "type=" + type : ""
                  }`}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <script defer src="/script-account.js"></script> */}
    </>
  );
}

// function Account({ id, balance, type }) {
//   return (
//     <tr>
//       <td>{id}</td>
//       <td>{balance}</td>
//       <td>{type}</td>
//       <td>
//         {/* <button>Delete</button> */}
//         <Link href="/accounts?"></Link>
//       </td>
//     </tr>
//   );
// }

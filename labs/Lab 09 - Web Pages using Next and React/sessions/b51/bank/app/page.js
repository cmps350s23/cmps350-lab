import styles from "./page.module.css";
import Link from "next/link";

export default async function Home({ searchParams }) {
  let { type, action, id } = searchParams;
  console.log(action);

  if (action === "delete") {
    const res = await fetch(`http://localhost:3001/api/accounts/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
  }

  // console.log(type);

  const res = await fetch(
    "http://localhost:3001/api/accounts" + (type ? `?type=${type}` : "")
  );
  const data = await res.json();

  return (
    <>
      <h2>Accounts</h2>
      <select id="type">
        <option value="">All</option>
        <option value="current">Current</option>
        <option value="savings">Savings</option>
      </select>
      <ul>
        <li>
          <Link href="">All</Link>
        </li>
        <li>
          <Link href="?type=current">Current</Link>
        </li>
        <li>
          <Link href="?type=savings">Savings</Link>
        </li>
      </ul>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.type.toUpperCase()}</td>
              <td>${account.balance.toLocaleString()}</td>
              <td>
                <Link href={`?action=delete&id=${account.id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <script src="/script.js"></script>
    </>
  );
}

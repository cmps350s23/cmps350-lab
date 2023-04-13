import * as repo from "@/utilities/repository.js";

export default async function Home() {
  const accounts = await repo.readAccounts();

  // const accounts = await fetch("http://localhost:3000/api/accounts").then(
  //   (res) => res.json()
  // );

  return (
    <>
      <h2>Accounts</h2>
      <select name="type" id="type">
        <option value="">All</option>
        <option value="current">Current</option>
        <option value="savings">Savings</option>
      </select>
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
            <Account key={a.id} id={a.id} balance={a.balance} type={a.type} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Account({ id, balance, type }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{balance}</td>
      <td>{type}</td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
}

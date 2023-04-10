import styles from "./page.module.css";
import * as repo from "../utilities/repository.js";

export default async function Home() {
  // const accounts = await repo.readAccounts();
  // console.log(accounts);

  const res = await fetch("http://localhost:3001/api/accounts");
  const accounts = await res.json();

  return (
    <>
      <h2>Accounts</h2>
      {JSON.stringify(accounts)}
    </>
  );
}

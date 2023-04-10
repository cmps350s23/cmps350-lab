import styles from "./header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Green Bank</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Accounts</Link>
          </li>
          <li>
            <Link href="/transactions">Transactions</Link>
          </li>
          <li>
            <Link href="/new">New Account</Link>
          </li>
          <li>
            <Link href="/transactions/new">New Transaction</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

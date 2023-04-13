import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/accounts">Accounts</Link>
          </li>
          <li>
            <Link href="/transactions">Transactions</Link>
          </li>
          <li>
            <Link href="/accounts/new">New Account</Link>
          </li>
          <li>
            <Link href="/transactions/new">New Transaction</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

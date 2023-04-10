export default function Header() {
  return (
    <header>
      <h1>Green Bank</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Accounts</a>
          </li>
          <li>
            <a href="/transactions">Transactions</a>
          </li>
          <li>
            <a href="/new">New Account</a>
          </li>
          <li>
            <a href="/transactions/new">New Transaction</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

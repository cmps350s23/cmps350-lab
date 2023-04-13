export default function Header({ title }) {
  return (
    <header>
      {title}
      <nav>
        <ul>
          <li>
            <a href="/">Accounts</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

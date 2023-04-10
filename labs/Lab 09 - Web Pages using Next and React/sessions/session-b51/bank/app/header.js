import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
            {/* <a href="/">Home</a> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

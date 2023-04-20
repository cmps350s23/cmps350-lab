import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

import { IBM_Plex_Sans_Arabic } from "next/font/google";
const sans = IBM_Plex_Sans_Arabic({
  subsets: ["latin"],
  // weight: "variable",
  weight: ["200", "300", "400", "500", "600", "700"],
});
// import Link from "next/link";

export const metadata = {
  title: "Photo Albums",
  description: "",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      {/* <head>
        <title>Photo Albums</title>
      </head> */}
      <body className={`${sans.className} p-5 mx-auto`}>
        {/* <body className="p-5 mx-auto"> */}
        <header>
          <h1 className="font-semibold text-xl text-center mb-5">
            Photo Albums
          </h1>
          {/* <nav>
            <ul className="flex flex-wrap gap-x-2">
              <li>
                <Link href="">Home</Link>
              </li>
              <li>
                <Link href="">Albums</Link>
              </li>
            </ul>
          </nav> */}
        </header>
        <main>{children}</main>
        <footer></footer>
        <Analytics />
      </body>
    </html>
  );
}

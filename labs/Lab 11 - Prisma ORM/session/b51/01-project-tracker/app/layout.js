import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

import { IBM_Plex_Sans_Arabic } from "next/font/google";
const sans = IBM_Plex_Sans_Arabic({
  subsets: ["latin"],
  // weight: "variable",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Project Task Tracker",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sans.className} p-5 max-w-xl mx-auto`}>
        <header>
          <h1 className="font-bold text-xl text-center mb-5">
            Project Task Tracker
          </h1>
        </header>
        <main>{children}</main>
        <footer></footer>
        <Analytics />
      </body>
    </html>
  );
}

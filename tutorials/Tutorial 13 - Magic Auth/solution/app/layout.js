import "./globals.css";
import { Source_Sans_3 } from "next/font/google";

const family = Source_Sans_3({ subsets: ["latin"] });

export const metadata = {
  title: "Magic Auth",
  description: "",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#dc2626" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${family.className} mx-auto max-w-md bg-white p-5 text-black dark:bg-zinc-900 dark:text-zinc-200`}
      >
        {children}
      </body>
    </html>
  );
}

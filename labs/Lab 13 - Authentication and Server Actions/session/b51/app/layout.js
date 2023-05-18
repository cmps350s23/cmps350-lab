import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Authentication and Server Actions",
  description: "",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-4`}>{children}</body>
    </html>
  );
}

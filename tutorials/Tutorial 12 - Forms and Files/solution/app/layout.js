import "./globals.css";
import { Source_Sans_3 } from "next/font/google";

const family = Source_Sans_3({ subsets: ["latin"] });

export const metadata = {
  title: "Forms and Files",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={family.className}>{children}</body>
    </html>
  );
}

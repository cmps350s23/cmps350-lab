import "./globals.css";
import { Source_Sans_3 } from "next/font/google";

const inter = Source_Sans_3({ subsets: ["latin"] });

export const metadata = {
  title: "Ideas",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-auto max-w-sm`}>{children}</body>
    </html>
  );
}

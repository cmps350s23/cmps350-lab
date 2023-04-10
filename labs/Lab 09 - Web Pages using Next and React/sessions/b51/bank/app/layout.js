import "./globals.css";
import Header from "./header.js";

export const metadata = {
  title: "Bank",
  description: "Lovely green building!",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Header />
        <main>{children}</main>
        <footer>&copy; 2023 The Green Gang</footer>
      </body>
    </html>
  );
}

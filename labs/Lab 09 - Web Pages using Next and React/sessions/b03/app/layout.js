import "./globals.css";
import Header from "@/app/header.js";

export const metadata = {
  title: "Green Bank",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header title="Lorem" />
        {/* {Header({ title: "Lorem" })} */}
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}

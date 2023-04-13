import "./globals.css";
import Header from "@/app/header.js";
import Footer from "@/app/footer.js";

export const metadata = {
  title: "Green Bank",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* {Header()} */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

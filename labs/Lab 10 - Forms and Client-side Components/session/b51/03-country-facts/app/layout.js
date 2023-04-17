import "./globals.css";

export const metadata = {
  title: "Country Facts",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-5">{children}</body>
    </html>
  );
}

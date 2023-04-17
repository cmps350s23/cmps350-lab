import "./globals.css";

export const metadata = {
  title: "Project Task Tracker",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-5">
        <header>
          <h1 className="font-semibold text-center text-xl mt-3">
            Project Task Tracker
          </h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

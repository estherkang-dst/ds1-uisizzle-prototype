import "./globals.css";

export const metadata = {
  title: "DS-1",
  description: "DS-1 Audience Intelligence Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

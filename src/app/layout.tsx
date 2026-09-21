import "./globals.css";

export const metadata = {
  title: "VALTARIQ GEO",
  description: "AI Visibility & GEO Intelligence Platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

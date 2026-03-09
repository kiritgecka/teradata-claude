import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teradata → Snowflake | AI Migration Platform",
  description:
    "End-to-end agentic platform to migrate your Teradata estate to Snowflake — automatically, autonomously, and with gated human oversight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-body bg-brand-bg text-brand-text">
        {children}
      </body>
    </html>
  );
}

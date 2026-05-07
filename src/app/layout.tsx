import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FollowUp Tracker - Never Miss a Follow-Up",
  description:
    "A lightweight follow-up tracker for solo outreach. Track contact history, set follow-up reminders, and see who needs a reply next.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}

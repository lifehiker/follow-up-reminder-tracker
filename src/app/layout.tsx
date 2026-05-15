import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { siteUrl } from "@/lib/marketing-content";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FollowUp Tracker - Never Miss a Follow-Up",
  description:
    "A lightweight follow-up tracker for solo outreach. Track contact history, set follow-up reminders, and see who needs a reply next.",
  openGraph: {
    title: "FollowUp Tracker",
    description:
      "Track contact history, set follow-up reminders, and see who needs a reply next.",
    url: siteUrl,
    siteName: "FollowUp Tracker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FollowUp Tracker",
    description:
      "A lightweight follow-up tracker for solo outreach.",
  },
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

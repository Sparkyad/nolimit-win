import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/components/SolanaProvider";
import { AdminProvider } from "@/components/AdminProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NoLimit",
  description: "Prediction Market on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.className} antialiased bg-[#0C0C0C] text-white`}
      >
        <SolanaProvider>
          <AdminProvider>{children}</AdminProvider>
        </SolanaProvider>
      </body>
    </html>
  );
}

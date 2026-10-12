import type { Metadata } from "next";
import "./globals.css";
import { BankProvider } from "@/components/BankProvider";
export const metadata: Metadata = {
  title: "BankFlow | Mock Banking",
  description: "Fictional banking assignment demo"
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><BankProvider>{children}</BankProvider></body></html>;
}

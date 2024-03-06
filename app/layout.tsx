import DefaultNav from "@/components/Nav/DefaultNav";
import type { Metadata } from "next";
import { AuthProvider } from "./Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Disease Prediction",
  description: "This system predict disease based on symptoms and recommend doctor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary font-poppins">
        <AuthProvider>
          <DefaultNav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

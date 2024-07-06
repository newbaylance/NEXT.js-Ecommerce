import type { Metadata } from "next";
import RequireLogin from "@/components/requireLogin";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Tirta Shoes Store",
  description: "#1 Shoes Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireLogin>
        {children}
    </RequireLogin>
  );
}

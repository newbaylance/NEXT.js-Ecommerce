import type { Metadata } from "next";
import RequireLogin from "@/components/requireLogin";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function WishlistLayout({
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

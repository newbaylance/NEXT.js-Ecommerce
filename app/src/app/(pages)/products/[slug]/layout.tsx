import type { Metadata } from "next";
import RequireLogin from "@/components/requireLogin";


export const metadata: Metadata = {
  title: "Tirta Shoes Store",
  description: "#1 Shoes Store",
};

export default function ProductSlugLayout({
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

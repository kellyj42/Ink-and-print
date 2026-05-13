"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";
import Navbar from "./nav";

export default function SiteChrome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSanityRoute = pathname?.startsWith("/sanity");
  const isAdminRoute = pathname?.startsWith("/admin");
  const isConfirmEmailRoute = pathname?.startsWith("/confirm-email");

  return (
    <>
      {!isSanityRoute && !isAdminRoute && !isConfirmEmailRoute && <Navbar />}
      {children}
      <Footer />
    </>
  );
}

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

  return (
    <>
      {!isSanityRoute && <Navbar />}
      {children}
      <Footer />
    </>
  );
}

"use state";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/images/Logo.png";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") return null;
  return (
    <>
      <nav className="bg-gray-50 flex items-center justify-between gap-6 mx-auto px-10 py-4 shadow-sm">
        {/* logo */}
        <Link href="/dashboard">
          <Image src={Logo} alt="logo" className="w-12" />
        </Link>
        {/* Menu Links */}
        <div className="flex items-center gap-6 text-black">
          <Link
            href="/topup"
            className={pathname === "/topup" ? "text-red-500" : "text-black"}
          >
            Top Up
          </Link>
          <Link
            href="/history"
            className={pathname === "/history" ? "text-red-500" : "text-black"}
          >
            Transaction
          </Link>
          <Link
            href="/akun"
            className={pathname === "/akun" ? "text-red-500" : "text-black"}
          >
            Akun
          </Link>
        </div>
      </nav>
    </>
  );
}

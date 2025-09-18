"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pathData = [
  { name: "Performance", href: "/performance" },
  { name: "Reliability", href: "/reliability" },
  { name: "Scale", href: "/scale" },
];

export default function Header() {
  const pathname = usePathname();
  console.log(pathname, 1321321);
  
  return (
    <div>
      <div className="absolute w-full z-10">
        <div className="flex justify-between container mx-auto text-white p-8 items-center">
          <Link
            className={`text-3xl font-bold ${
              pathname === "/" ? "text-purple-500" : ""
            }`}
            href="/"
          >
            Home
          </Link>
          <div className="text-xl space-x-4">
            {pathData.map((path) => (
              <Link
                className={pathname === path.href ? "text-purple-500" : ""}
                key={path.name}
                href={path.href}
              >
                {path.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

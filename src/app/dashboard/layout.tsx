"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const linkData = [
  {
    name: "About",
    href: "/dashboard/about",
  },

  {
    name: "Settings",
    href: "/dashboard/settings",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  const pathName = usePathname();
  console.log(pathName);

  return (
    <div className="border-1 border-dashed border-white p-4 w-1/2 mx-auto mt-10">
      <div className="flex gap-4 font-bold text-lg mb-4">
        {linkData?.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={pathName === link.href ? "text-purple-500" : ""}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <h2>Dashboard Layout {count}</h2>
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded-md my-4"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      {children}
    </div>
  );
}

"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { message } from "antd";
import { useRouter } from "next/navigation";

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
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const [count, setCount] = useState(0);
  const pathName = usePathname();

  const onLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      messageApi.success(data.message);
      setTimeout(() => {
        router.push("/login"); 
      }, 2000);
    }
  };

  return (
    <div className="border-1 border-dashed border-white p-4 w-1/2 mx-auto mt-10">
      {contextHolder}
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

      <div className="mt-20">
        <h2>退出登录按钮 logout</h2>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md my-4"
          onClick={onLogout}
        >
          logout
        </button>
      </div>
    </div>
  );
}

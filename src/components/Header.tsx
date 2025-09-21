"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

const pathData = [
  { name: "Performance", href: "/performance" },
  { name: "Reliability", href: "/reliability" },
  { name: "Scale", href: "/scale" },
  { name: "Blog", href: "/blog" },
  { name: "ParallelRoutes", href: "/parallel-routes" },
  { name: "InterceptingRoutes", href: "/intercepting-routes" },
  { name: "ToDoList", href: "/todolist" },
];

export default function Header() {
  const pathname = usePathname();

  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
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
    <div>
      {contextHolder}
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
            <Button
              className="!bg-purple-500 ml-5"
              type="primary"
              onClick={onLogout}
            >
              登出
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

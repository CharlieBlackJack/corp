"use client";
import React, { useState } from "react";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  return (
    <div className="border-1 border-dashed border-white p-4 mx-auto mt-10">
      <h2>Dashboard Template {count}</h2>
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

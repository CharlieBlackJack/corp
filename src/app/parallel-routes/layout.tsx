import React from "react";
import Link from "next/link";

export default function ParallelRoutesLayout({
  children,
  team,
  analytics,
}: Readonly<{
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center text-blue-500 p-6 gap-6 text-6xl font-bold">
        <Link href="/parallel-routes">Home</Link>
        <Link href="/parallel-routes/visitors">Analytics</Link>
      </div>
      <div className="flex gap-6">
        {team}
        {analytics}
      </div>
      {children}
    </div>
  );
}

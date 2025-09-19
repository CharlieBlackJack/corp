import React from "react";

export default function ParallelRoutesLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto">
      {children}
      {modal}
    </div>
  );
}

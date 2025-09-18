import React from "react";
import Content from "@/components/Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PerformancePage",
};

export default function PerformancePage() {
  return (
    <Content
      imageSrc="/performance.jpg"
      altText="Performance"
      title="Performance Said Hello!"
    />
  );
}

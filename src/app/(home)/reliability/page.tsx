import React from "react";
import Content from "@/components/Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReliabilityPage",
};

export default function ReliabilityPage() {
  return (
    <Content
      imageSrc="/reliability.jpg"
      altText="Reliability"
      title="Reliability Said Hello"
    />
  );
}

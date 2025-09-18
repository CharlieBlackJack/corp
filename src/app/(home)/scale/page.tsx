import React from "react";
import Content from "@/components/Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ScalePage",
};

export default function ScalePage() {
  return (
    <Content imageSrc="/scale.jpg" altText="Scale" title="Scale Said Hello" />
  );
}

import React from "react";
import BlogList from "@/components/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "This is the blog page",
};

export default function Page() {
  return <BlogList />;
}

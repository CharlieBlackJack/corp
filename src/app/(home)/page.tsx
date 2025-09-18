import Content from "@/components/Content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function RootPage() {
  return (
    <Content
      imageSrc="/home.jpg"
      altText="Home"
      title="Next.js Said Hello world!"
    />
  );
}

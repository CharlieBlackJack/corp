import React from "react";
import { Card } from "antd";
import { data } from "@/data/index";
import { Metadata } from "next";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `博客详情 - ${params?.id}`,
  };
}

export default function Page({ params }: PageProps) {
  const itemData = data.find((item) => item.id === Number(params.id));
  return (
    <div>
      <Card title={itemData?.title}>
        <p>{itemData?.body}</p>
      </Card>
    </div>
  );
}

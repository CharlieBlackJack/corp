import React, { use } from "react";
import { Card } from "antd";
import { data } from "@/data/index";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `博客详情 - ${id}`,
  };
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  const itemData = data.find((item) => item.id === Number(id));

  return (
    <div>
      <Card title={itemData?.title}>
        <p>{itemData?.body}</p>
      </Card>
    </div>
  );
}

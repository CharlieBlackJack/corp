"use client";
import React, { use } from "react";
import { products } from "@/app/intercepting-routes/data";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const product = products.find((p) => p.id === Number(id))!;

  return (
    <div
      className="flex justify-center items-center fixed inset-0 bg-gray-500/[.8]"
      onClick={router.back}
    >
      <Image
        width={400}
        height={400}
        src={product?.imageSrc}
        alt={product?.imageAlt}
        className="rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

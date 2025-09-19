import React from "react";
import Image from "next/image";
import { products } from "../../data";

export default function Page({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id))!;

  return (
    <div className="container mx-auto my-8">
      <Image
        className="rounded-lg block mx-auto my-8"
        src={product?.imageSrc}
        alt={product?.imageAlt}
        width={300}
        height={300}
      />
      <div className="border-2 border-dashed border-gray-500 rounded-lg p-3 leading-8">
        <p>
          <strong>Title:</strong> {product?.name}
        </p>
        <p>
          <strong>Price:</strong> {product?.price}
        </p>
        <p>
          <strong>Desc:</strong> {product?.imageAlt}
        </p>
      </div>
    </div>
  );
}

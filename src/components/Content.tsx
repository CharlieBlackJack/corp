import React from "react";
import Image from "next/image";

type PropsType = {
  imageSrc: string;
  altText: string;
  title: string;
};

export default function Content(props: PropsType) {
  const { imageSrc, title, altText } = props;
  return (
    <div className="h-screen relative">
      <div className="absolute inset-0 -z-10">
        <Image src={imageSrc} alt={altText} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950"></div>
      </div>
      <div className="text-white flex justify-center pt-48 text-6xl">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CardUrlWithCard } from "@/types";
import { AlignLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ImagesListProps {
  data: CardUrlWithCard;
};

export const ImagesList = ({
  data
}: ImagesListProps) => {

    console.log(data)

    const dataArray = Array.isArray(data) ? data : [data];

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">
          All Images
        </p>
        {dataArray.map((item) => (
        <div key={item.id} className="flex flex-row space-x-4 space-y-4 w-full">
            <Image
                src={item.url}
                alt={item.card.title}
                width={100}
                height={100}
            />
            <p>created: {item.updatedAt}</p>
            <p>order: {item.order}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

ImagesList.Skeleton = function ImagesListSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};
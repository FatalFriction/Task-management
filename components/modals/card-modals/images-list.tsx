"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CardUrlWithCard } from "@/types";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { ImagesActions } from "./_components-images/images-actions";
import { format } from "date-fns";
import { useState } from "react";
import { ExpandedImageModal } from "./_components-images/image-fullscreen";

interface ImagesListProps {
  data: CardUrlWithCard;
};

export const ImagesList = ({
  data
}: ImagesListProps) => {

    const [expandedImageUrl, setExpandedImageUrl] = useState<string | null>(null);

    const handleImageClick = (imageUrl: string) => {
      setExpandedImageUrl(imageUrl);
    };

    const handleCloseModal = () => {
      setExpandedImageUrl(null);
    };

    const dataArray = Array.isArray(data) ? data : [data];

  return (
    <div className="flex items-start gap-x-3 w-full">
      <ImageIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">
          All Images
        </p>
        {dataArray.length === 0
          ? <div className="min-h-[42px] bg-neutral-100 text-sm font-medium py-2.5 rounded-md"> Upload your first Image</div>
          : <ScrollArea className="h-[250px]">
            {dataArray.map((item) => (
            <div key={item.id} className="grid grid-flow-col w-full space-x-2.5 space-y-2.5">
                <Image
                    src={item.url}
                    alt={item.card.id}
                    width={100}
                    loading="lazy"
                    height={100}
                    onClick={() => handleImageClick(item.url)}
                    className="py-2.5 w-auto h-auto cursor-pointer rounded-xl"
                />
                <div className="font-medium text-neutral-600">
                  <p className="w-[470px] truncate">{item.title}</p>
                  <p>{format(new Date(item.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
                </div>
                {!item
                ? <ImagesActions.Skeleton />
                : <ImagesActions data={item}/>
                }
            </div>
            ))}
            </ScrollArea>
        }
        {expandedImageUrl && (
          <ExpandedImageModal imageUrl={expandedImageUrl} onClose={handleCloseModal} />
        )}
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
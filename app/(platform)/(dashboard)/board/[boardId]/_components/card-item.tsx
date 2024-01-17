"use client";

import { Card } from "@prisma/client";
import { useCardModal } from "@/hooks/use-card-modal";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Draggable = dynamic(() => import("@hello-pangea/dnd").then((mod) => mod.Draggable));

interface CardItemProps {
  data: Card;
  index: number;
};

export const CardItem = ({
  data,
  index,
}: CardItemProps) => {
  const cardModal = useCardModal();
    // Define a function to determine the background color based on status
    const getBackgroundColor = (status: string): string => {
      switch (status) {
        case 'DRAFT':
          return 'bg-[#ca8a04]';
        case 'PENDING':
          return 'bg-[#fde047]';
          case 'INREVIEW':
          return 'bg-blue-400';
        case 'COMPLETE':
          return 'bg-[#90ee90]';
        case 'CANCELLED':
          return 'bg-[#f08080]';
        default:
          return 'white'; // Default color if status doesn't match any case
      }
    };
  
    // Get the background color based on data.status
    const backgroundColor = getBackgroundColor(data.status);

    // Use classNames library to conditionally apply classes
    const cardItemClasses = cn(
      "truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm",
      backgroundColor // Conditionally apply background color
    );

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className={cardItemClasses}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
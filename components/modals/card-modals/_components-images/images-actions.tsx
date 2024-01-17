"use client";

import { toast } from "sonner";
import { DownloadIcon, LoaderIcon, Trash } from "lucide-react";
import { useParams } from "next/navigation";

import { CardUrlWithCard } from "@/types";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { deleteCardUrl } from "@/actions/delete-images";
import { deleteImage } from "@/lib/delete-images";
import useDownloader from 'react-use-downloader';

interface ActionsProps {
  data: CardUrlWithCard;
};

export const ImagesActions = ({
  data,
}: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { 
    execute: executedeleteCardUrl,
    isLoading: isLoadingDelete,
  } = useAction(deleteCardUrl, {
    onSuccess: (data) => {
      toast.success(`Images "${data.title}" deleted`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    const boardId = params.boardId as string;
    deleteImage(data.card.id, data.title)

    executedeleteCardUrl({
      id: data.id,
      cardId: data.card.id,
      boardId,
    });
  };

  const { download,isInProgress  } = useDownloader();

  const onDownload = () => {
    download(process.env.NEXT_PUBLIC_CORS_URL+data.url, data.title+".png")
  };
  
  return (
    <div className="flex flex-row xl:flex-col space-x-2 xl:space-x-0 xl:space-y-2 mt-2">
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete || isInProgress}
        variant="gray"
        className="w-fit px-2.5 justify-end"
        size="icon"
      > 
        <Trash className="h-4 w-4 mx-2" />
      </Button>
      <Button
        onClick={onDownload}
        disabled={isInProgress}
        variant="gray"
        className="w-fit px-2.5 justify-end"
        size="inline"
      >
        {!isInProgress ? <DownloadIcon className="h-7 w-4 mx-2" /> : <LoaderIcon className="h-7 w-4 mx-2" />}
      </Button>
    </div>
  );
};

ImagesActions.Skeleton = function ImagesActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
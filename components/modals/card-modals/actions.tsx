"use client";

import { toast } from "sonner";
import { Ban, Check, Copy, Loader2, PenSquareIcon, Trash } from "lucide-react";
import { useParams } from "next/navigation";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { deleteCard } from "@/actions/delete-card";
import { updateCard } from "@/actions/update-card";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateCard } from "@/actions/update-card/schema";

interface ActionsProps {
  data: CardWithList;
};

export const Actions = ({
  data,
}: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();
  
  const boardId = params.boardId as string;

  const { 
    execute: executeCopyCard,
    isLoading: isLoadingCopy,
  } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" copied`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  
  const onCopy = () => {
    
    executeCopyCard({
      id: data.id,
      boardId,
    });
  };
  
  const { 
    execute: executeDeleteCard,
    isLoading: isLoadingDelete,
  } = useAction(deleteCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" deleted`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  const queryClient = useQueryClient();

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id]
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id]
      });

      // toast.success(`Renamed to "${data.title}"`);
      // setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { 
    execute: executeStatusCard,
    isLoading: isLoadingStatus,
  } = useAction(updateCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.status}" `);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDraft = () => {

    executeStatusCard({
      id: data.id,
      boardId,
      status: "DRAFT",
    });
  };
  
  const onPending = () => {

    executeStatusCard({
      id: data.id,
      boardId,
      status: "PENDING",
    });
  };
  
  const onComplete = () => {

    executeStatusCard({
      id: data.id,
      boardId,
      status: "COMPLETE",
    });
  };

  const onCancel = () => {

    executeStatusCard({
      id: data.id,
      boardId,
      status: "CANCELLED",
    });
  };
  
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">
        Card Actions
      </p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
      <div className="pt-[53px] space-y-2">
        <p className="text-xs font-semibold">
          Status Actions
        </p>
        <Button
          onClick={onDraft}
          disabled={isLoadingStatus}
          variant="draft"
          className="w-full justify-start"
          size="inline"
        >
          <PenSquareIcon className="h-4 w-4 mr-2" />
          DRAFT
        </Button>
        <Button
          onClick={onPending}
          disabled={isLoadingStatus}
          variant="pending"
          className="w-full justify-start"
          size="inline"
        >
          <Loader2 className="h-4 w-4 mr-2" />
          PENDING
        </Button>
        <Button
          onClick={onComplete}
          disabled={isLoadingStatus}
          variant="complete"
          className="w-full justify-start"
          size="inline"
        >
          <Check className="h-4 w-4 mr-2" />
          COMPLETE
        </Button>
        <Button
          onClick={onCancel}
          disabled={isLoadingStatus}
          variant="destructive"
          className="w-full justify-start"
          size="inline"
        >
          <Ban className="h-4 w-4 mr-2" />
          CANCELLED
        </Button>
      </div>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
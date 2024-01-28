"use client";

import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useState, useRef, ElementRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

interface RevisionProps {
  data: CardWithList;
  role?: any;
};

export const Revision = ({
  data,
  role
}: RevisionProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  }

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id]
      });
      toast.success(`Card "${data.title}" updated`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    if(role!=="admin"){
      toast.error("Please Contact the Authorized Superior for edit access")
      return
    }

    const revision = formData.get("revision") as string;
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      status: data.status,
      ListTitle: data.list.title,
      revision,
      boardId,
    })
  }

  return (
    <div className="flex items-start gap-x-3 w-full pb-4">
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">
          Revision
        </p>
        {isEditing ? (
          <form
            action={onSubmit}
            ref={formRef}
            className="space-y-2"
          >
            <FormTextarea
              id="revision"
              className="w-full min-h-[220px] mt-2"
              placeholder="Add a more detailed revision"
              defaultValue={data.revision || undefined}
              errors={fieldErrors}
              ref={textareaRef}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>
                Save
              </FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[220px] max-h-[300px] break-words overflow-hidden w-full bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {data.revision || "Add a more detailed revision..."}
          </div>
        )}
      </div>
    </div>
  );
};

Revision.Skeleton = function RevisionSkeleton() {
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
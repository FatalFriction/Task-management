"use client";

import dynamic from "next/dynamic";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import React, {
  forwardRef,
  useRef,
  KeyboardEventHandler,
  RefObject,
} from "react";
import { useParams } from "next/navigation";
import { useOnClickOutside, useEventListener } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";

const FormSubmit = dynamic(
  () => import("@/components/form/form-submit").then((mod) => mod.FormSubmit)
);
const FormTextarea = dynamic(
  () => import("@/components/form/form-textarea").then((mod) => mod.FormTextarea)
);
const Button = dynamic(() => import("@/components/ui/button").then((mod) => mod.Button));

interface CardFormProps {
  listId: string;
  listTitle: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, listTitle, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    // Use React's HTMLFormElement ref type
    const formRef = useRef<HTMLFormElement | null>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);
        // Reset the native form
        (formRef.current as HTMLFormElement | null)?.reset();
      },
      onError: (error) => {
        toast.error(String(error));
      },
    });

    // Global keyboard handler (window)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };


    // useOnClickOutside expects RefObject<HTMLElement>, HTMLFormElement extends HTMLElement,
    // so we cast the ref safely.
    useOnClickOutside(formRef as unknown as RefObject<HTMLElement>, disableEditing);

    useEventListener("keydown", onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = (formData.get("title") as string) || "";
      const listIdVal = (formData.get("listId") as string) || listId;
      const status = "DRAFT";
      const boardId = (params as { boardId?: string })?.boardId as string;

      execute({ title, status, listId: listIdVal, boardId, listTitle });
    };

    if (isEditing) {
      return (
        <form ref={formRef} action={onSubmit} className="m-1 py-0.5 px-1 space-y-4">
          <FormTextarea
            id="title"
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" value={listId} readOnly />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";

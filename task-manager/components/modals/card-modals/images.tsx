"use client";

import { AlignLeft } from "lucide-react";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { Skeleton } from "@/components/ui/skeleton";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { uploadImage } from "@/lib/upload-images";
import { useAction } from "@/hooks/use-action";
import { createImages } from "@/actions/create-images";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface ImagesUpProps {
  data: any;
};

export const ImagesUp = ({
  data
}: ImagesUpProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);

  const { execute, fieldErrors } = useAction(createImages, {
    onSuccess: (data) => {
      toast.success(`Images "${data.url}" uploaded`);
      formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
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

  const [file, setFile] = useState<File>();

  const onSubmit = async (formData:FormData) => { 
    if(!file) return

        const final = await uploadImage(file);
        
        const url = final as string;
        const cardId = data.id as string;
        const boardId = params.boardId as string;

        execute({ url, cardId, boardId });
  }

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">
          Images
        </p>
        {isEditing ? (
          <form
            action={onSubmit}
            ref={formRef}
            className="space-y-2"
          >
            <FormInput
                id="imagesupload"
                type="file"
                placeholder="please upload the images..."
                accept=".png, .jpg"
                required
                onChanges={(e:any) => setFile(e.target?.files[0])}
                className="min-h-[42px] bg-neutral-100 text-sm font-medium py-2.5 rounded-md"
                errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>
                Upload
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
            className="min-h-[28px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {"Click to Upload"}
          </div>
        )}
      </div>
    </div>
  );
};

ImagesUp.Skeleton = function ImageUpSkeleton() {
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
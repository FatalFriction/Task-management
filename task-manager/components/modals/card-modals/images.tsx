"use client";

import { AlignLeft, ImagePlusIcon } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { useCardModal } from "@/hooks/use-card-modal";
import Image from "next/image";
import { CardUrlWithCard } from "@/types";

interface ImagesUpProps {
  data: CardUrlWithCard;
};

export const ImagesUp = ({
  data
}: ImagesUpProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const cardModal = useCardModal();

  const formRef = useRef<ElementRef<"form">>(null);

  const { execute, fieldErrors } = useAction(createImages, {
    onSuccess: (data) => {
      toast.success(`Images "${data.title}" uploaded`);
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
    setFile(null)
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setFile(null)
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const [file, setFile] = useState<File | null>();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [customFileName, setCustomFileName] = useState<string>('');

  const onPaste = (event:React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const imageFile = items[i].getAsFile();
            setFile(imageFile)
        }
    }
  };

  const onSubmit = async (formData:FormData) => { 
    if(!file) {
      toast.error("Please input an image file")
      return
    }

        const final = await uploadImage(file,customFileName, (progress) => {
          setUploadProgress(progress)
        });

        let title;
        setUploadProgress(0)
        if(!customFileName) {
         title = file.name as string
        }
        else {
          title = customFileName as string
        }
        const url = final as string;
        const cardId = data.id as string;
        const boardId = params.boardId as string;
        console.log(title)

        execute({ url,title, cardId, boardId });
        cardModal.onClose();
  }

  return (
    <div className="flex items-start gap-x-3 w-full">
      <ImagePlusIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">
          Images
        </p>
        {isEditing ? (
          <form
            action={onSubmit}
            ref={formRef}
            className="space-y-2.5"
          >
            <FormInput
            id="imagesname"
            type="text"
            placeholder="Enter custom file name..."
            value={customFileName}
            onChanges={(e:any) => setCustomFileName(e.target.value)}
            className="min-h-[42px] bg-neutral-100 text-sm font-medium py-2.5 rounded-md"
            />
            <div className="w-full flex flex-row space-x-4">
              <FormInput
                  id="imagesupload"
                  type="file"
                  placeholder="please upload the images..."
                  accept=".png, .jpg"
                  onChanges={(e:any) => setFile(e.target?.files[0])}
                  className="min-h-[42px] bg-neutral-100 text-sm font-medium py-2.5 rounded-md"
                  errors={fieldErrors}
              />
              <div
                className="cursor-pointer text-center min-h-[42px] bg-neutral-100 text-sm font-medium py-2.5 rounded-md outline-dashed outline-[0.5px] outline-neutral-500"
                onPaste={onPaste}
              >
                  Click here to then use Control-V to paste the image.
              </div>
            </div>
            {file && <Image src={URL.createObjectURL(file)} alt="Uploaded Image" width={235} height={150} />}
            <Progress value={uploadProgress} />
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
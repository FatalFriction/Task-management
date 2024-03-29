"use client";

import { useQuery } from "@tanstack/react-query";

import { CardUrlWithCard, CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { AuditLog } from "@prisma/client";
import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { Activity } from "./activity";
import { ImagesUp } from "./images";
import { ImagesList } from "./images-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: cardUrlData } = useQuery<CardUrlWithCard>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const [imageClickResult, setImageClickResult] = useState<number | false>(false);

  const trackData = (data: number|false) => {
    return setImageClickResult(data)
  }

  const { data: cardImageData } = useQuery<CardUrlWithCard>({
    queryKey: ["card-images", id],
    queryFn: () => fetcher(`/api/cards/${id}/images`),
    refetchInterval: imageClickResult,
    refetchOnWindowFocus: true,
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  const { data: userRole } = useQuery<[]>({
    queryKey: ["user-role"],
    queryFn: () => fetcher(`/api/role`),
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
      <ScrollArea className="h-[550px] px-5 xl:h-[850px]">
        {!cardData
          ? <Header.Skeleton />
          : <Header data={cardData} />
        }
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData
                ? <Description.Skeleton />
                : <Description data={cardData} />
              }
              {!cardUrlData
                ? <ImagesUp.Skeleton />
                : <ImagesUp data={cardUrlData} ids={id} onImageClick={trackData} ListTitle={cardData!.list.title} CardTitle={cardData!.title} />
              }
              {!cardImageData
                ? <ImagesList.Skeleton />
                : <ImagesList data={cardImageData}/>
              }
              {!auditLogsData
                ? <Activity.Skeleton />
                : <Activity items={auditLogsData} />
              }
            </div>
          </div>
          {!cardData ? (
            <Actions.Skeleton />
            ) : (
            cardUrlData && cardImageData && (
              <Actions data={cardData} ids={id} role={userRole}/>
            )
          )}
        </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
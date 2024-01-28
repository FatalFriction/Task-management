"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteCardUrl } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id,cardId, boardId, ListTitle } = data;
  let cardUrl;

  try {

    cardUrl = await db.cardUrl.delete({
      where: {
        id,
        cardId:cardId,
        card: {
          list: {
            board: {
              orgId,
            },
          },
        }
      },
    });

    await createAuditLog({
      entityTitle: cardUrl.title,
      entityId: cardUrl.cardId,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE,
      ListTitle: ListTitle
    })
  } catch (error) {
    return {
      error: "Failed to delete."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: cardUrl };
};

export const deleteCardUrl = createSafeAction(DeleteCardUrl, handler);
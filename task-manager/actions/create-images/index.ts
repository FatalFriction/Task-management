"use server"

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CreateImages } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data:InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId){
        return {
            error: "Unauthorized",
        }
    }
    
    const { url,cardId,boardId } = data
    let cardUrl;

    try {
        
        const Card = await db.card.findUnique({
            where: {
                id: cardId,
            },
        })

        if(!Card) {
            return {
                error: "Card not found"
            }
        }

        const lastimages = await db.cardUrl.findFirst({
            where: { cardId },
            orderBy: { order: "desc" },
            select: { order: true },
        })
        
        const newOrder = lastimages ? lastimages.order + 1:1;

        cardUrl = await db.cardUrl.create({
            data: {
                url,
                cardId,
                order:newOrder,
            }
        })

        await createAuditLog({
            entityId: cardUrl.id,
            entityTitle: cardUrl.url,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.UPLOAD,
        })

        const boardId = await db.list.findUnique({
            where: { id: cardId },
            select: { boardId: true }, // Only select the boardId field for efficiency
        });

        
    } catch (error) {
        return {
            error: "Failed to create"
        }
    }

    revalidatePath(`/board/${boardId}`)
    return {data: cardUrl}
};

export const createImages = createSafeAction(CreateImages, handler);
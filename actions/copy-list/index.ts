"use server"

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyList } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data:InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId){
        return {
            error: "Unauthorized",
        }
    }
    
    const { id,boardId } = data
    let list;

    try {
        const listToCopy = await db.list.findUnique({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
            include: {
                cards: true,
            },
        })

        if(!listToCopy) {
            return { error: "List not found"}
        }

        const LastList = await db.list.findFirst({
            where: { boardId },
            orderBy: { order: "desc" },
            select: { order: true },
        })

        const newOrder = LastList ? LastList.order + 1 : 1;

        list = await db.list.create({
            data: {
                boardId: listToCopy.boardId,
                title: `${listToCopy.title} - Copy`,
                order: newOrder,
                cards: {
                    createMany: {
                        data: listToCopy.cards.map((card) => ({
                            title: card.title,
                            status: card.status,
                            description: card.description,
                            order: card.order,
                        }))
                    },
                },
            },
            include: {
                cards: true,
            },
        })

    } catch (error) {
        return {
            error: "Failed to copy"
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list  }
};

export const copyList = createSafeAction(CopyList, handler);
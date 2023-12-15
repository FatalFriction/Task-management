"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-actions";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth();

    if(!userId) {
        return {
            error: "Unauthorized",
        }
    }

    const { title } = data;

    let board;
    
    try{
        board = await db.board.create({
            data:{
                title,
            }
        })
    } catch (error) {
        return {
            error: "Internal error"
        }
    }

    revalidatePath(`/board/{board.id}`)
    return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
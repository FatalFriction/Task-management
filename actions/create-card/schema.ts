import { z } from "zod"

const statusEnum = z.enum(["DRAFT", "PENDING", "COMPLETE", "CANCELLED"]);

export const CreateCard = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(3,{
        message: "Title is too short"
    }),
    status: statusEnum,
    boardId: z.string(),
    listId: z.string(),
    listTitle: z.string(),
})
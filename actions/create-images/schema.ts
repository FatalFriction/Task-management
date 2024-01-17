import { z } from "zod"

export const CreateImages = z.object({
    url: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(3,{
        message: "Title is too short"
    }),
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(3,{
        message: "Title is too short"
    }).max(70,{
        message: "Title is too long"
    }),
    cardId: z.string(),
    boardId: z.string(),
})
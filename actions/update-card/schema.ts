import { z } from "zod";

const statusEnum = z.enum(["DRAFT", "PENDING", "COMPLETE", "CANCELLED","INREVIEW"]);

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z.string({
      required_error: "Description is required",
      invalid_type_error: "Description is required",
    }).min(3, {
      message: "Description is too short.",
    }),
  ),
  title: z.optional(
    z.string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    }).min(3, {
      message: "Title is too short",
    })
  ),
  status: statusEnum,
  ListTitle: z.string(),
  revision: z.optional(
    z.string({
      required_error: "Description is required",
      invalid_type_error: "Description is required",
    }).min(3, {
      message: "Description is too short.",
    }),
  ),
  id: z.string(),
});

import { z } from "zod";

export const DeleteCardUrl = z.object({
  id: z.string(),
  cardId: z.string(),
  boardId: z.string(),
});
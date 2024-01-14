import { z } from "zod";
import { CardUrl } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteCardUrl } from "./schema";

export type InputType = z.infer<typeof DeleteCardUrl>;
export type ReturnType = ActionState<InputType, CardUrl>;
import { z } from "zod"
import { CardUrl } from "@prisma/client";
import { CreateImages } from "./schema"
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CreateImages>;
export type ReturnType =  ActionState<InputType, CardUrl>
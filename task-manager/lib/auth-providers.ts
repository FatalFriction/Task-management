import { auth } from "@clerk/nextjs";

export async function getOrgAndUserId() {
    const { orgId, userId } = await auth();
    return { orgId, userId };
  }
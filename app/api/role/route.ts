import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
) {
  try {
    const { userId, orgId, orgRole } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(orgRole);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
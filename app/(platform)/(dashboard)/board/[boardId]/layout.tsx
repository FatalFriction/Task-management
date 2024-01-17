import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) {
    return {
      title: "Board",
    };
  }
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });
  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
    return null; // Return early if redirecting
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
    return null; // Return early if board not found
  }

  return (
    <div className="relative h-full">
      <>
        <Image
          src={board.imageFullUrl}
          alt="board images"
          quality={90} // Use higher quality image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, (max-width: 1560px) 120vw, 45vw"
          loading="eager"
          className="relative"
          style={{ objectFit: "cover" }}
        />
        <BoardNavbar data={board} />
        <div className="absolute inset-0 bg-black/10" />
        <main className="relative pt-28 h-full">{children}</main>
      </>
    </div>
  );
};

export default BoardIdLayout;
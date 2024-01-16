import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";
import Image from "next/image";

export async function generateMetadata({
    params,
} : { 
    params: { boardId: string }
}) {
    const { orgId } = auth()

    if(!orgId){
        return {
            title: "Board"
        }
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId,
        }
    })

    return {
        title: board?.title || "Board"
    }
}

const BoardIdLayout = async ({
    children,
    params,
} : {
    children: React.ReactNode,
    params: { boardId: string }
}) => {
    const { orgId } = auth()

    if(!orgId) {
        redirect("/select-org")
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId,
        }
    })

    if(!board) {
        notFound();
    }

    return (
        <div className="relative h-full">
            <div>
                <Image
                    src={board.imageFullUrl}
                    alt="board images"
                    quality={50}
                    priority
                    fill
                    sizes="70vw"
                    loading="eager"
                    className="relative"
                    style={{ objectFit: 'cover'}}
                />
                <BoardNavbar data={board}/>
                <div className="absolute inset-0 bg-black/10"/>
                <main className="relative pt-28 h-full">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default BoardIdLayout;
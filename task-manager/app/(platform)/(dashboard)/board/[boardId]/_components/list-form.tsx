"use client"

import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

export const ListForm = () => {
    const Params = useParams()
    const [isEditing, setIsEditing] = useState(false)
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {  
            inputRef.current?.focus()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef,disableEditing)

    if(isEditing) {
        return (
            <ListWrapper>
                <form 
                    ref={formRef}
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-md">
                    <FormInput 
                        ref={inputRef}
                        id="title"
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
                        placeholder="Enter List title..."
                    />
                    <input
                        hidden
                        value={Params.boardId}
                        name="BoardId"
                    />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>
                            Add List
                        </FormSubmit>
                        <Button 
                            onClick={disableEditing}
                            variant="ghost"
                            size="sm"
                        >
                            <X className="h-5 w-5"/>
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
    <ListWrapper>
            <button 
                onClick={enableEditing}
                className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
                <Plus className="h-4 w-4 mr-2"/>
                Add a list
            </button>
    </ListWrapper>
  )
};

"use client"
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { pusherClient } from "@/lib/pusher-client";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BellDotIcon, BellIcon, CheckIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { getBackgroundColor } from "@/constants/backgroundColor";

type CardProps = React.ComponentProps<typeof Card>;

interface NotificationCardProps extends CardProps {
    ids: string;
}
export function NotificationCard({ className, ids, ...props }: NotificationCardProps) {
    const [isBellClicked, setIsBellClicked] = useState(false);
    const [messages, setMessages] = useState<{ notification: string; createdAt: Date, entityStatus: string }[]>([]);
    
    const ref = useRef<HTMLDivElement>(null);

    const handleBellClick = () => {
        setIsBellClicked(true);
    };

    const handleRetrieveData = () => {
        const storedMessages = localStorage.getItem("notification_messages");
        if (storedMessages) {
            const parsedMessages = JSON.parse(storedMessages);
            setMessages(parsedMessages);
        }
    };

    const handlePusherData = (res: { data: string; createdAt: Date, user: string, entityStatus: string }) => {
        // Check if the notification is from another user
        
            const newMessage = { notification: res.data, createdAt: res.createdAt, entityStatus: res.entityStatus };
            if (res.user !== ids) {
            setMessages((prevMessages) => {
                // Check if the message already exists in the array
                if (!prevMessages.some((msg) => msg.notification === newMessage.notification)) {
                    const updatedMessages = [...prevMessages, newMessage];
                    console.log(updatedMessages)
                    localStorage.setItem("notification_messages", JSON.stringify(updatedMessages));
                    return updatedMessages;
                } else {
                    // If the message already exists, return the current state
                    return prevMessages;
                }
            });
        }
    };    

    const subscribePusherChannel = async () => {
        const channels = await pusherClient.subscribe("messages");
        channels.bind("notifications", handlePusherData);
    };

    const handleServiceWorkerRegistration = () => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then(() => console.log("Service worker registered successfully"))
                .then(() => subscribePusherChannel())
                .then(() => handleRetrieveData())
                .catch((error) => console.error("Service worker registration failed:", error));
        }
    };

    const handleMarkAllAsRead = () => {
        // Clear all data in local storage
        localStorage.removeItem("notification_messages");
        // Clear messages state
        setMessages([]);
        setIsBellClicked(false);
    };

    useEffect(() => {
        handleServiceWorkerRegistration();
    }, []);

    useOnClickOutside(ref, () => {
        setIsBellClicked(false);
    });

    return (
        <>
            {!isBellClicked ? (
                messages.length > 0 ? (
                    <BellDotIcon onClick={handleBellClick} className="cursor-pointer hover:fill-black" />
                ) : <BellIcon onClick={handleBellClick} className="cursor-pointer hover:fill-black" />
            ) : (
                <>
                    <Card ref={ref} className={cn("w-[420px] translate-x-11", className)} {...props}>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>You have {messages.length} unread messages.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <ScrollArea className="h-[250px]">
                                {messages.map((message, index) => {
                                    const timeDifference = formatDistanceToNow(message.createdAt, {
                                        addSuffix: true,
                                    });
                                    // Get the background color based on data.status
                                    const backgroundColor = getBackgroundColor(message.entityStatus);
                                    return (
                                        <div
                                            key={index}
                                            className="mb-1.5 grid grid-cols-[20px_1fr] items-start pb-2.5 last:mb-0 last:pb-0"
                                        >
                                            <span className={cn( "flex h-2 w-2 translate-y-1 rounded-full ", backgroundColor)} />
                                            <div className="space-y-1 pr-8">
                                                <p className="text-sm font-medium leading-[17px] whitespace-normal break-words">
                                                    {message.notification}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{timeDifference}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </ScrollArea>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleMarkAllAsRead} className="w-full">
                                <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
                            </Button>
                        </CardFooter>
                    </Card>
                    <BellIcon className="relative fill-black" />
                </>
            )}
        </>
    );
}

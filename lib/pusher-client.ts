"use client"

import PusherClient from "pusher-js"
import * as PusherPushNotifications from "@pusher/push-notifications-web";

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_APP_KEY!,
    {
        cluster: process.env.NEXT_PUBLIC_APP_CLUSTER!,
    }
)

export const beamsClient = new PusherPushNotifications.Client({
    instanceId: process.env.NEXT_PUBLIC_BEAM_ID!,
})

const Pusher = require("pusher")

export const pusherServer = new Pusher({
    appId: process.env.NEXT_PUBLIC_APP_ID!,
    key: process.env.NEXT_PUBLIC_APP_KEY!,
    secret: process.env.NEXT_PUBLIC_SECRET!,
    cluster: process.env.NEXT_PUBLIC_APP_CLUSTER!,
    useTLS: true
})

const PushNotifications = require('@pusher/push-notifications-server');

export const beamsServer = new PushNotifications({
    instanceId: process.env.NEXT_PUBLIC_BEAM_ID!,
    secretKey: process.env.NEXT_PUBLIC_BEAM_SECRET!,
})
import { Card, CardUrl, List } from "@prisma/client";


export type ListWithCards = List & { cards: Card[] }

export type CardWithList = Card & { list: List }

export type CardUrlWithCard = CardUrl & { card: Card }
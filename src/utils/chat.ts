import { Chat, Prisma } from "@prisma/client"
import prisma from "../prisma"

export async function getOrCreateChat(chatId: number) {
  return await prisma.chat.upsert({
    where: {
      chatId,
    },
    update: {},
    create: {
      chatId,
    },
  })
}

export async function updateChat(chat: Chat, data: Prisma.ChatUpdateInput) {
  return await prisma.chat.update({
    where: {
      chatId: chat.chatId,
    },
    data,
  })
}

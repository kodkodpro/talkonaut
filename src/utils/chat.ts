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

export async function getChat(chatId: number) {
  return await prisma.chat.findUnique({
    where: {
      chatId,
    },
  })
}

export async function createChat(data: Prisma.ChatCreateInput) {
  return await prisma.chat.create({
    data,
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

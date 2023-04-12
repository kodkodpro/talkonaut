import { Chat, Prisma } from "@prisma/client"
import { updateChat } from "./chat"

export async function setNextCommand(chat: Chat, nextCommand: Prisma.ChatUpdateInput["nextCommand"]) {
  return updateChat(chat, { nextCommand })
}

export function removeCommand(text: string) {
  return text.replace(/^\/\w+/, "").trim()
}

export function noMessageTextError() {
  return new Error("Message text is empty")
}

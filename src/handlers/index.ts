import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"

export type MessageType = "text" | "voice"
export type MessageHandlerFn = (message: TelegramBot.Message, chat: Chat) => Promise<void>

const handlers: Record<MessageType, MessageHandlerFn> = {
  text: await import("./text").then((module) => module.default),
  voice: await import("./voice").then((module) => module.default),
}

export default handlers

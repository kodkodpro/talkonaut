import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"

export default async function newchat(message: TelegramBot.Message, chat: Chat) {
  console.log("New chat")
}

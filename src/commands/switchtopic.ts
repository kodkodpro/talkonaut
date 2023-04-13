import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import { sendMessage } from "../utils/bot"

export default async function switchtopic(message: TelegramBot.Message, chat: Chat) {
  await sendMessage(chat, "🤷‍♀️ Sorry, but this functionality is still in development")
}

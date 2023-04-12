import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"

export default async function handleVoiceMessage(message: TelegramBot.Message, chat: Chat) {
  console.log("This is a voice message")
}

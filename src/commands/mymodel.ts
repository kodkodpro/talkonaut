import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import { sendMessage } from "../utils/bot"

export default async function mykey(message: TelegramBot.Message, chat: Chat) {
  if (chat.openAIModel) {
    await sendMessage(chat, `🤖 Your current model is: *${chat.openAIModel}*`)
  } else {
    await sendMessage(chat, "🔑 You need to set your OpenAI API key first. Please, use /setkey to do that")
  }
}

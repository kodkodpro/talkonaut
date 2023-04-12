import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import bot from "../bot"

export default async function getkey(message: TelegramBot.Message, chat: Chat) {
  if (chat.openAIKey) {
    // Return key in secure way (show only last 6 characters)
    const maskedKey = `************${chat.openAIKey.slice(-6)}`

    await bot.sendMessage(chat.chatId, `Your OpenAI key is: ${maskedKey}`)
  } else {
    await bot.sendMessage(chat.chatId, "You haven't set your OpenAI key yet")
  }
}

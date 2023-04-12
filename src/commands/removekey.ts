import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import bot from "../bot"
import { updateChat } from "../utils/chat"

export default async function removekey(message: TelegramBot.Message, chat: Chat) {
  if (chat.openAIKey) {
    await updateChat(chat, { openAIKey: null })
    await bot.sendMessage(chat.chatId, "Ok, I've removed your OpenAI key")
  } else {
    await bot.sendMessage(chat.chatId, "You don't have an OpenAI key set")
  }
}

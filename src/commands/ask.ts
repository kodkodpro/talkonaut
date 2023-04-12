import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import bot from "../bot"
import { noMessageTextError, removeCommand } from "../utils/command"
import { createCompletion } from "../utils/openai"

export default async function ask(message: TelegramBot.Message, chat: Chat) {
  if (!message.text) throw noMessageTextError()

  await bot.sendChatAction(chat.chatId, "typing")

  const text = removeCommand(message.text)
  const completion = await createCompletion(chat, text)

  await bot.sendMessage(chat.chatId, completion || "I don't know")
}

import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import bot from "../bot"
import { updateChat } from "../utils/chat"
import { noMessageTextError, removeCommand, setNextCommand } from "../utils/command"
import { createCompletion } from "../utils/openai"

export default async function setkey(message: TelegramBot.Message, chat: Chat) {
  if (!message.text) throw noMessageTextError()

  const openAIKey = removeCommand(message.text)

  if (openAIKey) {
    await bot.sendMessage(chat.chatId, "⏱️ Checking your OpenAI key...")
    chat = await updateChat(chat, { openAIKey })

    const completion = await createCompletion(chat, "test")

    if (!completion) {
      await bot.sendMessage(chat.chatId, "😢 OpenAI key is invalid")
      return
    }

    await setNextCommand(chat, null)
    await bot.sendMessage(chat.chatId, "👍 All good, OpenAI key is valid and set")
  } else {
    await setNextCommand(chat, "setkey")

    await bot.sendMessage(chat.chatId, "Please send me your OpenAI key")
  }
}

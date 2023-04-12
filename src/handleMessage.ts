import TelegramBot from "node-telegram-bot-api"
import bot from "./bot"
import handlers from "./handlers"
import { getOrCreateChat } from "./utils/chat"
import { BotError } from "./utils/error"

export default async function handleMessage(message: TelegramBot.Message) {
  const chatId = message.chat.id

  try {
    const chat = await getOrCreateChat(chatId)

    if (message.text) {
      await handlers.text(message, chat)
    } else if (message.voice) {
      await handlers.voice(message, chat)
    } else {
      await bot.sendMessage(chatId, "Sorry, I don't understand this kind of messages 😢")
    }
  } catch (error) {
    if (error instanceof BotError) {
      await bot.sendMessage(chatId, error.message)
    } else if (error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
      
      await bot.sendMessage(chatId, "Sorry, something went wrong 😢")
    }
  }
}

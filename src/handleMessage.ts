import Sentry from "@sentry/node"
import TelegramBot from "node-telegram-bot-api"
import bot from "./bot"
import handlers from "./handlers"
import { sendMessage } from "./utils/bot"
import { createChat, getChat } from "./utils/chat"
import { BotError } from "./utils/error"

export default async function handleMessage(message: TelegramBot.Message) {
  const chatId = message.chat.id

  try {
    let chat = await getChat(chatId)

    if (!chat) {
      chat = await createChat({ chatId, nextCommand: "setkey" })

      await sendMessage(chat, [
        "🖖 Hi there! I'm an *Open Source* chatbot that is powered by *OpenAI's API (GPT-4)*",
        "🤖 You can send me both text and voice messages, and I will do my best to reply to you",
        "🔒 We don't store any of your messages, and we don't share any of your data with anyone",
        "👩‍💻 Feel free to check out the source code at [GitHub](https://github.com/kodkodpro/talkonaut)",
        "🚀 *Let's start by setting up your OpenAI key.* You can get it from [OpenAI Dashboard](https://platform.openai.com/account/api-keys)",
        "🔑 Type your API key below:",
      ], { disableLinkPreview: true })

      return
    }

    if (message.text) {
      await handlers.text(message, chat)
    } else if (message.voice) {
      await handlers.voice(message, chat)
    } else {
      await sendMessage(chat, "Sorry, I don't understand this kind of messages 😢")
    }
  } catch (error) {
    if (error instanceof BotError) {
      await bot.sendMessage(chatId, error.message)
      return
    }

    if (error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
    }

    Sentry.captureException(error)
    await bot.sendMessage(chatId, "Sorry, something went wrong 😢")
  }
}

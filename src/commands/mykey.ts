import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import { sendMessage } from "../utils/bot"

export default async function mykey(message: TelegramBot.Message, chat: Chat) {
  if (chat.openAIKey) {
    // Return key in a secure way (show only last 6 characters)
    const maskedKey = `xxxxxxxxxxxxxxxxx${chat.openAIKey.slice(-6)}`

    await sendMessage(chat, `🔑 Your OpenAI key is: *${maskedKey}*`)
  } else {
    await sendMessage(chat, "🤷‍♀️ You haven’t set your OpenAI key yet")
  }
}

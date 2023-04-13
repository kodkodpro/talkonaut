import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import { sendMessage } from "../utils/bot"
import { updateChat } from "../utils/chat"

export default async function removekey(message: TelegramBot.Message, chat: Chat) {
  if (chat.openAIKey) {
    await updateChat(chat, { openAIKey: null, openAIModel: null })
    await sendMessage(chat, "👌 Ok, I’ve removed your OpenAI key")
  } else {
    await sendMessage(chat, "🤷‍♀️ You don’t have an OpenAI key set")
  }
}

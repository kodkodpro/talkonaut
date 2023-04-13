import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import { sendMessage } from "../utils/bot"
import { updateChat } from "../utils/chat"

export default async function cancel(message: TelegramBot.Message, chat: Chat) {
  if (!chat.nextCommand) {
    await sendMessage(chat, "🤷‍♀️ There is nothing to cancel")
    return
  }

  await updateChat(chat, { nextCommand: null })
  await sendMessage(chat, "😉 Ok, I’ve canceled it")
}

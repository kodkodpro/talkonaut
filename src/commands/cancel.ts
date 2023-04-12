import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import bot from "../bot"
import { setNextCommand } from "../utils/command"

export default async function cancel(message: TelegramBot.Message, chat: Chat) {
  if (!chat.nextCommand) {
    await bot.sendMessage(chat.chatId, "There is no command to cancel")
    return
  }

  await setNextCommand(chat, null)
  await bot.sendMessage(chat.chatId, "Ok, I've canceled the previous command")
}

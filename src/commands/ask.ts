import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import { sendMessage, setStatusTyping } from "../utils/bot"
import { noMessageTextError, removeCommand } from "../utils/command"
import { createAnyCompletion } from "../utils/openai"

export default async function ask(message: TelegramBot.Message, chat: Chat) {
  if (!message.text) throw noMessageTextError()

  await setStatusTyping(chat)

  const text = removeCommand(message.text)
  const completion = await createAnyCompletion(chat, text)

  await sendMessage(chat, completion || "🥴 Oops, something went wrong", { markdown: false })
}

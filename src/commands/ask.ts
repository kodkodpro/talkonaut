import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import { sendMessage, setStatusTyping } from "../utils/bot"
import { removeCommand } from "../utils/command"
import { BotError } from "../utils/error"
import { createAnyCompletion } from "../utils/openai"

export default async function ask(message: TelegramBot.Message, chat: Chat) {
  if (!message.text) throw new BotError("systemError")

  await setStatusTyping(chat)

  const text = removeCommand(message.text)
  const completion = await createAnyCompletion(chat, text)

  await sendMessage(chat, completion || "🥴 Oops, something went wrong", { disableMarkdown: true })
}

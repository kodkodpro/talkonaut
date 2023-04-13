import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import { sendMessage } from "../utils/bot"
import { updateChat } from "../utils/chat"
import { noMessageTextError, removeCommand } from "../utils/command"
import { findBestModel } from "../utils/openai"

const KeyRegex = /^sk-[a-zA-Z0-9]*$/

export default async function setkey(message: TelegramBot.Message, chat: Chat) {
  if (!message.text) throw noMessageTextError()

  const openAIKey = removeCommand(message.text)

  if (openAIKey) {
    if (!KeyRegex.test(openAIKey)) {
      await handleInvalidKey(chat)
      return
    }

    await sendMessage(chat, "⏱️ Checking your OpenAI key...")

    chat = await updateChat(chat, { openAIKey })
    const openAIModel = await findBestModel(chat)

    if (!openAIModel) {
      await handleInvalidKey(chat)
      return
    }

    chat = await updateChat(chat, { openAIModel, nextCommand: null })

    await sendMessage(chat, [
      "👍 All good, OpenAI key is valid and set",
      "🤖 Using *" + openAIModel + "* model",
    ])
  } else {
    await updateChat(chat, { nextCommand: "setkey" })
    await sendMessage(chat, "🔑 Please send me your OpenAI key:")
  }
}

const handleInvalidKey = async (chat: Chat) => {
  await updateChat(chat, { nextCommand: "setkey" })
  await sendMessage(chat, "😢 Sorry, but OpenAI key is invalid. Please send another key or /cancel this command:")
}

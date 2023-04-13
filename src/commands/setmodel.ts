import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import { sendMessage } from "../utils/bot"
import { updateChat } from "../utils/chat"
import { removeCommand } from "../utils/command"
import { BotError } from "../utils/error"
import { allModels, createAnyCompletion, Model } from "../utils/openai"

export default async function setmodel(message: TelegramBot.Message, chat: Chat) {
  if (!message.text) throw new BotError("systemError")

  if (!chat.openAIKey) {
    await updateChat(chat, { nextCommand: null })
    await sendMessage(chat, "🔑 You need to set your OpenAI API key first. Please, use /setkey to do that")
    return
  }

  const openAIModel = removeCommand(message.text).toLowerCase()

  if (openAIModel) {
    if (!allModels.includes(openAIModel)) {
      await handleInvalidModel(chat, "Invalid model name")
      return
    }

    await sendMessage(chat, "⏱️ Verifying access to selected OpenAI model...")
    const completion = await createAnyCompletion(chat, "test", openAIModel as Model)

    if (!completion) {
      await handleInvalidModel(chat, "Unfortunately, you don't have access to this model")
      return
    }

    await updateChat(chat, { openAIModel: openAIModel, nextCommand: null })
    await sendMessage(chat, `👍 All good, *${openAIModel}* model is now set as your default model`)
  } else {
    await updateChat(chat, { nextCommand: "setmodel" })
    await sendMessage(chat, [
      "⌨️ Please send me the name of model you want to use",
      `🤖 Available models: ${allModels.join(", ")}`,
      "👉 You can find their description here: https://platform.openai.com/docs/models/overview",
    ])
  }
}

const handleInvalidModel = async (chat: Chat, message: string) => {
  await updateChat(chat, { nextCommand: "setmodel" })

  await sendMessage(chat, [
    `😢 ${message}`,
    "Please send me a another model name or /cancel it:",
  ])
}

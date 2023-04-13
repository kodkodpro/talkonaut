import fs from "fs"
import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import commands from "../commands"
import { setStatusTyping } from "../utils/bot"
import { BotError } from "../utils/error"
import { convertToMp3, downloadFile } from "../utils/file"
import { createTranscription } from "../utils/openai"

export default async function handleVoiceMessage(message: TelegramBot.Message, chat: Chat) {
  if (!message.voice) throw new BotError("systemError")

  await setStatusTyping(chat)

  const originalFilepath = await downloadFile(message.voice.file_id)
  const mp3Filepath = await convertToMp3(originalFilepath)

  message.text = await createTranscription(chat, mp3Filepath)

  fs.rmSync(originalFilepath)
  fs.rmSync(mp3Filepath)

  await commands.ask(message, chat)
}

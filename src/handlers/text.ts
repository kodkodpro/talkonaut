import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import commands, { CommandName } from "../commands"
import { noMessageTextError } from "../utils/command"
import { BotError } from "../utils/error"

export default async function handleTextMessage(message: TelegramBot.Message, chat: Chat) {
  if (!message.text) throw noMessageTextError()

  // If the user is in the middle of a command, we don't want to process any other commands
  if (message.text.startsWith("/cancel")) {
    await commands.cancel(message, chat)
    return
  }

  // Process command that was saved in the database
  if (chat.nextCommand) {
    await commands[chat.nextCommand](message, chat)
    return
  }

  // Process current command
  if (message.text.startsWith("/")) {
    const commandName = message.text.split(" ")[0].slice(1)
    const commandExists = Object.keys(commands).includes(commandName)

    if (commandExists) {
      await commands[commandName as CommandName](message, chat)
    } else {
      throw new BotError("commandNotFound")
    }

    return
  }

  await commands.ask(message, chat)
}

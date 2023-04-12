import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"

export type CommandName = "setkey" | "getkey" | "removekey" | "newchat" | "cancel" | "ask"
export type CommandFn = (message: TelegramBot.Message, chat: Chat) => Promise<void>

const commands: Record<CommandName, CommandFn> = {
  setkey: await import("./setkey").then((module) => module.default),
  getkey: await import("./getkey").then((module) => module.default),
  removekey: await import("./removekey").then((module) => module.default),
  newchat: await import("./newchat").then((module) => module.default),
  cancel: await import("./cancel").then((module) => module.default),
  ask: await import("./ask").then((module) => module.default),
}

export default commands

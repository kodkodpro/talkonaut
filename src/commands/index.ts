import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"

// Commands:
// newtopic - Initiate a fresh conversation topic
// switchtopic - Switch to a different conversation topic
// setkey - Configure your OpenAI API key
// mykey - Get your current OpenAI API key
// removekey - Remove your OpenAI API key
// setmodel - Choose an AI chat model
// mymodel - Get your current AI chat model
// cancel - Cancel the current command

export type CommandName =
  | "newtopic"
  | "switchtopic"
  | "setkey"
  | "mykey"
  | "removekey"
  | "setmodel"
  | "mymodel"
  | "cancel"
  | "ask"

export type CommandFn = (message: TelegramBot.Message, chat: Chat) => Promise<void>

const commands: Record<CommandName, CommandFn> = {
  newtopic: await import("./newtopic").then((module) => module.default),
  switchtopic: await import("./switchtopic").then((module) => module.default),
  setkey: await import("./setkey").then((module) => module.default),
  mykey: await import("./mykey").then((module) => module.default),
  removekey: await import("./removekey").then((module) => module.default),
  setmodel: await import("./setmodel").then((module) => module.default),
  mymodel: await import("./mymodel").then((module) => module.default),
  cancel: await import("./cancel").then((module) => module.default),
  ask: await import("./ask").then((module) => module.default),
}

export default commands

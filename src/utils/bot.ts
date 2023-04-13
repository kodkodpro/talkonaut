import { Chat } from "@prisma/client"
import TelegramBot from "node-telegram-bot-api"
import bot from "../bot"

export type SendMessageOptions = {
  disableMarkdown?: boolean,
  disableLinkPreview?: boolean,
  replyButtons?: TelegramBot.InlineKeyboardButton[],
}

export async function sendMessage(chat: Chat, text: string | string[], options: SendMessageOptions = {}) {
  const textFormatted = Array.isArray(text) ? text.join("\n\n") : text
  const tgOptions: TelegramBot.SendMessageOptions = {}

  if (!options.disableMarkdown) tgOptions.parse_mode = "Markdown"
  if (options.disableLinkPreview) tgOptions.disable_web_page_preview = true
  if (options.replyButtons) tgOptions.reply_markup = { inline_keyboard: [options.replyButtons] }

  return await bot.sendMessage(chat.chatId, textFormatted, tgOptions)
}

export async function setStatusTyping(chat: Chat) {
  await bot.sendChatAction(chat.chatId, "typing")
}

import TelegramBot from "node-telegram-bot-api"

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is not set")
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })

bot.on("message", async (msg) => {
  const chatId = msg.chat.id

  await bot.sendMessage(chatId, "Received your message")
})

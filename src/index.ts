import "@total-typescript/ts-reset"
import "./sentry"
import bot from "./bot"
import handleMessage from "./handleMessage"

bot.on("message", handleMessage)

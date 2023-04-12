import "@total-typescript/ts-reset"

import bot from "./bot"
import handleMessage from "./handleMessage"

bot.on("message", handleMessage)

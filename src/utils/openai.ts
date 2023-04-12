import { Chat } from "@prisma/client"
import { Configuration, OpenAIApi } from "openai"
import { BotError } from "./error"

export function createOpenAIClient(chat: Chat) {
  if (!chat.openAIKey) throw new BotError("openAIKeyNotSet")

  const configuration = new Configuration({
    apiKey: chat.openAIKey,
  })

  return new OpenAIApi(configuration)
}

export async function createCompletion(chat: Chat, prompt: string) {
  try {
    const response = await createOpenAIClient(chat).createCompletion({
      prompt,
      model: "text-davinci-003",
    })

    return response.data.choices[0].text
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw new BotError("openAIKeyInvalid")
    }

    throw error
  }
}

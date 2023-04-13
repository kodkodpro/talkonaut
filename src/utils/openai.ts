import { Chat } from "@prisma/client"
import { Configuration, OpenAIApi } from "openai"
import { BotError } from "./error"

export const chatModels = [
  "gpt-4",
  "gpt-4-0314",
  "gpt-4-32k",
  "gpt-4-32k-0314",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-0301",
] as const

export const completionModels = [
  "text-davinci-003",
  "text-davinci-002",
  "text-curie-001",
  "text-babbage-001",
  "text-ada-001",
] as const

export const allModels = [...chatModels, ...completionModels] as const

export type Model = typeof allModels[number]

export function createOpenAIClient(chat: Chat) {
  if (!chat.openAIKey) throw new BotError("openAIKeyNotSet")

  const configuration = new Configuration({ apiKey: chat.openAIKey })
  return new OpenAIApi(configuration)
}

export async function createCompletion(chat: Chat, prompt: string, model?: Model) {
  try {
    const client = await createOpenAIClient(chat)

    model = model || (chat.openAIModel as Model) || undefined

    if (!model) throw new BotError("openAIModelNotSet")
    if (!completionModels.includes(model)) throw new BotError("openAIModelInvalid")

    const response = await client.createCompletion({
      model,
      prompt,
    })

    return response.data.choices[0].text
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw new BotError("openAIKeyInvalid")
    }

    throw error
  }
}

export async function createChatCompletion(chat: Chat, prompt: string, model?: Model) {
  try {
    const client = await createOpenAIClient(chat)

    model = model || (chat.openAIModel as Model) || undefined

    if (!model) throw new BotError("openAIModelNotSet")
    if (!chatModels.includes(model)) throw new BotError("openAIModelInvalid")

    const response = await client.createChatCompletion({
      model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })


    return response.data.choices[0].message?.content
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw new BotError("openAIKeyInvalid")
    }

    throw error
  }
}

export async function createAnyCompletion(chat: Chat, prompt: string, model?: Model) {
  model = model || (chat.openAIModel as Model) || undefined

  if (chatModels.includes(model)) {
    return createChatCompletion(chat, prompt, model)
  } else {
    return createCompletion(chat, prompt, model)
  }
}

export async function findBestModel(chat: Chat) {
  for (const model of allModels) {
    try {
      const text = await createAnyCompletion(chat, "test", model)

      if (text) {
        return model
      }
    } catch (error) {}
  }

  return null
}

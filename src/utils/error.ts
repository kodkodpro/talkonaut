type ErrorCode =
  | "commandNotFound"
  | "openAIKeyNotSet"
  | "openAIKeyInvalid"
  | "openAIModelNotSet"
  | "openAIModelInvalid"

export const ReadableErrors: Record<ErrorCode, string> = {
  commandNotFound: "🤷‍♀️ Sorry, but I don't know this command",
  openAIKeyNotSet: "🤷‍♀️ Sorry, but you didn't set your OpenAI key",
  openAIKeyInvalid: "🥴 Sorry, but your OpenAI key is invalid",
  openAIModelNotSet: "🤷‍♀️ Sorry, but you didn't set your OpenAI model",
  openAIModelInvalid: "🥴 Sorry, but your OpenAI model is invalid",
}

export class BotError extends Error {
  readonly code: ErrorCode

  constructor(code: ErrorCode, message?: string) {
    super(message || ReadableErrors[code])

    this.name = this.constructor.name
    this.code = code
  }
}

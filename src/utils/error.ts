type ErrorCode =
  | "commandNotFound"
  | "openAIKeyInvalid"
  | "openAIKeyNotSet"

export const ReadableErrors: Record<ErrorCode, string> = {
  commandNotFound: "🤷‍♀️ Sorry, but I don't know this command",
  openAIKeyInvalid: "🥴 Sorry, but your OpenAI key is invalid",
  openAIKeyNotSet: "🤷‍♀️ Sorry, but you didn't set your OpenAI key",
}

export class BotError extends Error {
  readonly code: ErrorCode

  constructor(code: ErrorCode, message?: string) {
    super(message || ReadableErrors[code])

    this.name = this.constructor.name
    this.code = code
  }
}

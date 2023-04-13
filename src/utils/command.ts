export function removeCommand(text: string) {
  return text.replace(/^\/\w+/, "").trim()
}

export function noMessageTextError() {
  return new Error("Message text is empty")
}

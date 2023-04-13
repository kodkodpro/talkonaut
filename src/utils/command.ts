export function removeCommand(text: string) {
  return text.replace(/^\/\w+/, "").trim()
}

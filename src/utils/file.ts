import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg"
import appRoot from "app-root-path"
import ffmpeg from "fluent-ffmpeg"
import bot from "../bot"

// Set ffmpeg path
// eslint-disable-next-line import/no-named-as-default-member
ffmpeg.setFfmpegPath(ffmpegPath)

export async function downloadFile(fileId: string) {
  return await bot.downloadFile(fileId, appRoot.toString())
}

export async function convertToMp3(filepath: string) {
  // Replace any extension with ".mp3"
  const mp3Path = filepath.replace(/\.[^/.]+$/, ".mp3")

  await new Promise((resolve, reject) => {
    ffmpeg(filepath)
      .output(mp3Path)
      .on("end", resolve)
      .on("error", reject)
      .run()
  })

  return mp3Path
}

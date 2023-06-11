import { FileSource } from "./types"

export function getFileName(source?: FileSource) {
  if (!source) return ""
  if (source.type === "url") {
    return source.url.split("/").pop()
  }
  return source.file?.name ?? ""
}

export async function getFileSize(source?: FileSource) {
  if (!source) return 0
  if (source.type === "file") {
    return source.file?.size ?? 0
  }
  return fetch(source.url).then((res) => parseInt(res.headers.get("content-length") ?? "0"))
}

// GB is enough for now
export function formatFileSize(bytes?: number) {
  if (!bytes) return ""
  const formatSize = (n: number) => n.toFixed(1).replace(/\.0$/, "")
  if (bytes < 1000) return `${formatSize(bytes)} B`
  if (bytes < 1000 * 1000) return `${formatSize(bytes / 1000)} KB`
  if (bytes < 1000 * 1000 * 1000) return `${formatSize(bytes / 1000 / 1000)} MB`
  return `${formatSize(bytes / 1000 / 1000 / 1000)} GB`
}

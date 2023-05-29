export interface UploadedFile {
  type: "url"
  url: string
}

export interface SelectedFile {
  type: "file"
  file: File | null
}

export type FileSource = UploadedFile | SelectedFile

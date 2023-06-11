import React, { useEffect, useState } from "react"
import cx from "classnames"

import useInnerRef from "@/hooks/useInnerRef"

import * as CS from "../common.style"
import * as S from "./FileInput.style"
import { FileSource } from "./types"

import { formatFileSize, getFileName, getFileSize } from "./utils"

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  label?: string
  errorMessage?: string
  maxFileSize?: number // in bytes, 0 means no limit
  value?: FileSource
  onValueChange?: (value: FileSource) => void
  renderPreview?(value?: FileSource): React.ReactNode
}

export default React.forwardRef(function FileInput(
  { label, maxFileSize = 0, value, errorMessage, renderPreview = defaultPreview, onValueChange, ...inputProps }: Props,
  outerRef: React.Ref<HTMLInputElement>
) {
  const ref = useInnerRef(outerRef)
  const [filled, setFilled] = useState(isFilled(value))
  const [sizeError, setSizeError] = useState(false)

  function isFilled(value?: FileSource) {
    if (value?.type === "file") return value.file !== null
    if (value?.type === "url") return value.url !== ""
    return false
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0]
    if (!file) return

    if (0 < maxFileSize && maxFileSize < file.size) {
      handleClear()
      setSizeError(true)
      return
    }

    const newValue: FileSource = { type: "file", file }
    inputProps.onChange?.(e)
    onValueChange?.(newValue)
    setSizeError(false)
    setFilled(isFilled(newValue))
  }

  function handleReselect() {
    handleClear()
  }

  function handleClear() {
    onValueChange?.({ type: "file", file: null })
    setSizeError(false)
    setFilled(false)
    if (ref.current) {
      ref.current.value = ""
    }
  }

  function download() {
    const url = value?.type === "url" && value.url
    if (!url) return
    window.open(url, "_blank")
  }

  function copyURL() {
    const url = value?.type === "url" && value.url
    if (!url) return
    navigator.clipboard.writeText(url)
  }

  const isEditable = !inputProps.disabled && !inputProps.readOnly
  const isError = Boolean(errorMessage)

  const selectedFile = ref.current?.files?.[0]
  const isUploaded = value?.type === "url" && value.url !== ""

  return (
    <CS.InputContainer
      className={cx("file-input", {
        filled,
        error: isError,
        disabled: inputProps.disabled,
      })}
    >
      <CS.LabelArea>{label && <label>{label}</label>}</CS.LabelArea>
      <S.InputArea>
        <CS.Input {...inputProps} type="file" ref={ref} onChange={handleChange} style={{ display: "none" }} />
        {filled && <S.Preview className="preview">{renderPreview(value)}</S.Preview>}
        {!filled && maxFileSize > 0 && <S.FileSize error={sizeError}>Max {formatFileSize(maxFileSize)}</S.FileSize>}
        {filled && <FileSize source={value} />}
        <S.Overlay>
          {!filled && isEditable && <S.OverlayButton onClick={() => ref.current?.click()}>Select File</S.OverlayButton>}
          {!filled && isEditable && <S.OverlayButton>Paste Link</S.OverlayButton>}
          {filled && isEditable && <S.OverlayButton onClick={handleReselect}>Reselect</S.OverlayButton>}
          {filled && isUploaded && <S.OverlayButton onClick={download}>Download</S.OverlayButton>}
          {filled && isUploaded && <S.OverlayButton onClick={copyURL}>Copy URL</S.OverlayButton>}
        </S.Overlay>
      </S.InputArea>
      <CS.ExtraArea>{errorMessage && <CS.Error>{errorMessage}</CS.Error>}</CS.ExtraArea>
    </CS.InputContainer>
  )
})

function defaultPreview(value?: FileSource) {
  return <S.FileName>{getFileName(value)}</S.FileName>
}

function FileSize({ source }: { source?: FileSource }) {
  const [size, setSize] = useState<number>(0)
  useEffect(() => {
    if (!source) return setSize(0)
    void getFileSize(source).then(setSize)
  }, [source])
  return <S.FileSize>{formatFileSize(size)}</S.FileSize>
}

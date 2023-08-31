import React, { useEffect, useState } from "react"
import cx from "classnames"

import useInnerRef from "@/hooks/useInnerRef"

import { FileSource } from "./types"

import { formatFileSize, getFileName, getFileSize } from "./utils"
import TextInput from "../TextInput"
import "./FileInput.css"

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
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [url, seturl] = useState("")

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

  function openUrlInput() {
    setShowUrlInput(true)
  }

  function setUrlValue() {
    setShowUrlInput(false)
    onValueChange?.({ type: "url", url })
    setFilled(isFilled({ type: "url", url }))
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
  const isUploaded = value?.type === "url" && value.url !== ""

  return (
    <div
      className={cx("leaf-input-container", "leaf-file-input", {
        filled,
        error: isError,
        disabled: inputProps.disabled,
      })}
    >
      <div className="leaf-label-area">{label && <label className="leaf-label">{label}</label>}</div>
      <div className="leaf-input-area">
        <input
          {...inputProps}
          className={cx("leaf-body", inputProps.className)}
          type="file"
          ref={ref}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        {filled && <div className="leaf-file-preview">{renderPreview(value)}</div>}
        {!filled && maxFileSize > 0 && (
          <span className={cx("leaf-file-size", { error: sizeError })}>Max {formatFileSize(maxFileSize)}</span>
        )}
        {filled && <FileSize source={value} />}
        <div className="leaf-file__overlay">
          {!filled && isEditable && (
            <button className="leaf-body" onClick={() => ref.current?.click()}>
              Select File
            </button>
          )}
          {!filled && isEditable && (
            <button className="leaf-body" onClick={openUrlInput}>
              Paste Link
            </button>
          )}
          {filled && isEditable && (
            <button className="leaf-body" onClick={handleReselect}>
              Reselect
            </button>
          )}
          {filled && isUploaded && (
            <button className="leaf-body" onClick={download}>
              Download
            </button>
          )}
          {filled && isUploaded && (
            <button className="leaf-body" onClick={copyURL}>
              Copy URL
            </button>
          )}
        </div>
        {showUrlInput && (
          <div className="leaf-file__url-input">
            <TextInput
              label="url"
              placeholder="paste file URL"
              value={url}
              onValueChange={seturl}
              onEnter={setUrlValue}
            />
            <button onClick={setUrlValue}>Confirm</button>
          </div>
        )}
      </div>
      <div className="leaf-extra-area">
        {errorMessage && <p className={cx("leaf-error-message", "leaf-desc")}>{errorMessage}</p>}
      </div>
    </div>
  )
})

function defaultPreview(value?: FileSource) {
  return <span className="leaf-file-name">{getFileName(value)}</span>
}

function FileSize({ source }: { source?: FileSource }) {
  const [size, setSize] = useState<number>(0)
  useEffect(() => {
    if (!source) return setSize(0)
    void getFileSize(source).then(setSize)
  }, [source])
  return <span className={cx("leaf-file-size")}>{formatFileSize(size)}</span>
}

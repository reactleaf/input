import React from "react"

interface IconProps {
  size?: number
  color?: string
}
export default function X({ size = 32, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color}>
      <path d="M8 8L16 16L24 24 M8 24L24 8" strokeWidth={2} />
    </svg>
  )
}

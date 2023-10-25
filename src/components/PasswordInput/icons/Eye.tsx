import React from "react"

interface Props extends React.SVGProps<SVGSVGElement> {
  opened: boolean
}
export default function Eye({ opened, ...props }: Props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      {!opened && (
        <g className="closed">
          <circle cx="16" cy="18" r="3" fill="currentColor" />
          <path d="M4 17C4 13 8 8 16 8C24 8 28 13 28 17" stroke="currentColor" strokeWidth="2" />
        </g>
      )}
      {opened && (
        <g className="opened">
          <path d="M2 28L11 22M30 3C30 3 27 9 23 13" stroke="currentColor" strokeWidth="2" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 27C19 27 26 24 26 17C26 11 26 7 16 7C6 7 6 11 6 17C6 24 13 27 16 27ZM11.2929 13.7071L14.5858 17L11.2929 20.2929L12.7071 21.7071L16 18.4142L19.2929 21.7071L20.7071 20.2929L17.4142 17L20.7071 13.7071L19.2929 12.2929L16 15.5858L12.7071 12.2929L11.2929 13.7071Z"
            fill="currentColor"
          />
        </g>
      )}
    </svg>
  )
}

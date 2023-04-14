import { ForwardedRef, useEffect, useRef } from "react"

/**
 * to use ref inside of forwardRef()
 */
export default function useInnerRef<T>(ref: ForwardedRef<T>) {
  const innerRef = useRef<T>(null)

  useEffect(() => {
    if (!ref) return
    if (typeof ref === "function") {
      ref(innerRef.current)
    } else {
      ref.current = innerRef.current
    }
  }, [innerRef, ref])

  return innerRef
}

import { RefObject, useEffect } from "react"

interface UseInteractOutside<T> {
  ref: RefObject<T>
  excludedRefs?: RefObject<Node>[]
  onInteractOutside: (e: MouseEvent) => void
}

export default function useInteractOutside<T extends HTMLElement>({
  ref,
  excludedRefs = [],
  onInteractOutside,
}: UseInteractOutside<T>) {
  function handleWindowClick(e: MouseEvent) {
    if (!ref.current) return
    const target = e.target as Node
    if (excludedRefs.some((ref) => ref.current?.contains(target))) return
    if (!ref.current.contains(target)) {
      onInteractOutside(e)
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleWindowClick)
    return () => window.removeEventListener("mousedown", handleWindowClick)
  }, [ref.current, excludedRefs, onInteractOutside])
}

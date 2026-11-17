import { useEffect, useState } from 'react'

const QUERY = '(min-width: 1024px) and (pointer: fine)'

/** Verdadeiro em telas ≥1024px com ponteiro fino (mouse). Gate da rolagem horizontal (A7). */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isDesktop
}

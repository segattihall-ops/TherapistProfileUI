import * as React from "react"
import { debounce } from 'lodash';

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = globalThis.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = debounce(() => {
      setIsMobile(globalThis.innerWidth < MOBILE_BREAKPOINT)
    }, 250);
    mql.addEventListener("change", onChange)
    setIsMobile(globalThis.innerWidth < MOBILE_BREAKPOINT)
    return () => {
      mql.removeEventListener("change", onChange)
      onChange.cancel();
    }
  }, [])

  return !!isMobile
}

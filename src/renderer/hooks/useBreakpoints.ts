const defaultBreakpoints: { [k: string]: any } = {
  xs: 0,
  s: 640,
  m: 1024,
  l: 1280,
  xl: 1536,
  xxl: 1920,
}

/** 屏幕断点 xs 0 | s 640 | m 1024 | l 1280 | xl 1536 | xxl 1920
 * @param {{ [k: string]: any }} customBreakpoints  {xs: 0, s: m, l: 1024, xl: 1280}
 * @param {{ [k: string]: any }} customBreakpoints  {0: 0, 300: 640, 600: 1024, 900: 1280}
 */
export function useBreakpoints(
  customBreakpoints: { [k: string | number]: any },
  el?: Ref<HTMLElement | undefined>
) {
  const { width } = el ? useElementSize(el) : useWindowSize()

  const useDefault = isNaN(Number(Object.keys(customBreakpoints)[0]))

  let breakpoints: [number, any][] = []
  Object.keys(customBreakpoints).forEach((key) => {
    const k = useDefault ? defaultBreakpoints[key] : Number(key)
    const v = customBreakpoints[key]
    if (k && v) breakpoints.push([k, v])
  })
  breakpoints = breakpoints.sort((a, b) => a[0] - b[0])

  return computed(() => {
    const point = breakpoints.find((val) => width.value < Number(val[0]))!
    return point && point[1]
  })
}

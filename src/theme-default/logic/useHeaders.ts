import { useState, useEffect } from "react";
import { Header } from "shared/types";
export function useHeaders(initHeaders: Header[]) {
  const [headers, setHeaders] = useState(initHeaders);

  useEffect(() => {
    if (import.meta.env.DEV) {
      import.meta.hot.on('mdx-changed', ({ filePath }: { filePath: string }) => {

        import(`${filePath}?import&t=${Date.now()}`).then((module) => {
          setHeaders(module.toc)
        })
      })
    }
  })
  return headers
}
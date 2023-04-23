import type { RouterEvent } from 'next/router'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type RouterEventProps = {
  eventName: RouterEvent
  callback: () => void
}

export const useRouterEvent = ({ eventName, callback }: RouterEventProps) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on(eventName, callback)
    router.events.on(eventName, callback)

    // cleanup function
    return () => {
      router.events.off(eventName, callback)
      router.events.off(eventName, callback)
    }
  })
}

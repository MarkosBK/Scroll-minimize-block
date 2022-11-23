import { useState, useEffect, useRef } from 'react'

const useDetectElement = ({ ref, firstOnly = false, options = {} }) => {
  const [isOnScreen, setIsOnScreen] = useState(true)
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      setIsOnScreen(entry.isIntersecting)
      if (firstOnly && entry.isIntersecting) {
        observerRef.current.disconnect()
      }
    }, options)
  }, [])

  useEffect(() => {
    try {
      if (observerRef.current) {
        observerRef.current?.observe(ref.current)

        return () => {
          observerRef.current.disconnect()
        }
      }
    } catch (error) {}
  }, [ref, observerRef])

  return isOnScreen
}

export default useDetectElement

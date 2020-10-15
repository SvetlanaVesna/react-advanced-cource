import { useState, useCallback } from 'react'
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount(x => x + 1), [])
  const incrementAsync = useCallback(() => setTimeout(increment, 100), [increment])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  if (count > 9000) {
    throw Error("It's over 9000!")
  }
  return { count, increment, incrementAsync, reset }
}

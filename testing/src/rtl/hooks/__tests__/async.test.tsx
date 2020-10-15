import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from '../async'

test('should increment counter after delay', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCounter())
  result.current.incrementAsync()
  await waitForNextUpdate()
  expect(result.current.count).toBe(1)
})

test('should throw when over 9000', () => {
  const { result } = renderHook(() => useCounter(9000))
  act(() => {
    result.current.increment()
  })
  expect(result.error).toEqual(Error("It's over 9000!"))
})

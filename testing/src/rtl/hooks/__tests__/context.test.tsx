import { renderHook, act } from '@testing-library/react-hooks'
import { CounterStepProvider, useCounter } from '../context'
import React, { FC } from 'react'

test('should use custom step when incrementing', () => {
  const wrapper: FC = ({ children }) => (
    <CounterStepProvider step={2}>{children}</CounterStepProvider>
  )

  const { result } = renderHook(() => useCounter(), { wrapper })
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(2)
})
test('should use custom step when incrementing', () => {
  const wrapper: FC<{ step: number }> = ({ children, step }) => (
    <CounterStepProvider step={step}>{children}</CounterStepProvider>
  )
  const { result, rerender } = renderHook(() => useCounter(), {
    wrapper,
    initialProps: {
      step: 2,
    },
  })
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(2)
  /**
   * Change the step value
   */
  rerender({ step: 8 })
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(10)
})

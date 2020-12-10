import React, { useEffect, useState } from 'react'
import MemoExample from './memo'
import DerivedStateExample from './derivedStateFromProps'
import ChatBox from './snapshotBeforeUpdate'

function MyExample() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, []) // Pass an empty array to run only callback on mount only.

  // No second argument, so run after every render.
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count])

  useEffect(() => {
    // It will be called before unmounting.
    return () => {
      console.log('componentWillUnmount!')
    }
  }, [])

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <h4>React.memo example</h4>
      <MemoExample weather={{ city: 'Moscow', temperature: count }} />
      <h4>Derived State Example</h4>
      <DerivedStateExample />
      <h4>Snapshot Before update Example</h4>
      <ChatBox />
    </div>
  )
}

export default MyExample

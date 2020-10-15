import React from 'react'

export function Foo() {
  return <div className="in-foo" />
}

export function Bar() {
  return (
    <div className="in-bar">
      <Foo />
      <Foo />
      <Foo />
    </div>
  )
}

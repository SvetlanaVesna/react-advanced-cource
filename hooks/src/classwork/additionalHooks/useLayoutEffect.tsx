import React, { RefObject } from 'react'

import './index.css'
const Message = ({ boxRef, children }: { boxRef: RefObject<any>; children: any }) => {
  const msgRef = React.useRef(null)

  React.useLayoutEffect(() => {
    const rect = boxRef.current.getBoundingClientRect()
    // @ts-ignore
    msgRef.current.style.top = `${rect.height + rect.top}px`
  }, [])

  return (
    <span ref={msgRef} className="msg">
      {children}
    </span>
  )
}

const App = () => {
  const [show, setShow] = React.useState(false)
  const boxRef = React.useRef(null)

  return (
    <div>
      <div ref={boxRef} className="box" onClick={() => setShow((prev) => !prev)}>
        Click me
      </div>
      {show && <Message boxRef={boxRef}>Foo bar baz</Message>}
    </div>
  )
}

export default App

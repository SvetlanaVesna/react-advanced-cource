import React from 'react'

const MyInput = React.forwardRef((props, ref) => {
  const [val, setVal] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useImperativeHandle(ref, () => ({
    blur: () => {
      document.title = val
      inputRef.current?.blur()
    },
  }))

  return (
    <input
      ref={inputRef}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      {...props}
    />
  )
})

const App = () => {
  const ref = React.useRef<HTMLInputElement>(null)
  const onBlur = () => {
    console.log(ref.current) // Only contains one property!
    ref.current?.blur()
  }

  // @ts-ignore
  return <MyInput ref={ref} onBlur={onBlur} />
}

export default App

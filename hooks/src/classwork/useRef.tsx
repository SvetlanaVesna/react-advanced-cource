import React from 'react'
function App() {
  const [value, setValue] = React.useState<string>('')
  const valueRef = React.useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    if (valueRef.current) setValue(valueRef.current.value)
  }

  return (
    <div className="App">
      <h4>Value: {value}</h4>
      <input ref={valueRef} />
      <button onClick={handleClick}>Show value</button>
    </div>
  )
}

export default App

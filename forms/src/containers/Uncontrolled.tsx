import React, { BaseSyntheticEvent } from 'react'
const NameForm = () => {
  const input = React.createRef<HTMLInputElement>();

  const handleSubmit = (event: BaseSyntheticEvent) => {
    alert('A name was submitted: ' + input.current)
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default NameForm

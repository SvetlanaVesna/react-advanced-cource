import React, { BaseSyntheticEvent, useState } from 'react'

const Simple = () => {
  const [value, setValue] = useState()

  const handleChange = (event: BaseSyntheticEvent) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: BaseSyntheticEvent) => {
    alert('A name was submitted: ' + value)
    event.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Simple

import React, { BaseSyntheticEvent, useState } from 'react'
const Reservation = () => {
  const [values, setValues] = useState({
    isGoing: true,
    numberOfGuests: 2,
  })

  const handleInputChange = (event: BaseSyntheticEvent) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <form>
      <label>
        Is going:
        <input
          name="isGoing"
          type="checkbox"
          checked={values.isGoing}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Number of guests:
        <input
          name="numberOfGuests"
          type="number"
          value={values.numberOfGuests}
          onChange={handleInputChange}
        />
      </label>
    </form>
  )
}

export default Reservation

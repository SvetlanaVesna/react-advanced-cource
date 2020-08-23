import React, { FC, createContext, useState, Dispatch, SetStateAction } from 'react'
import { noop } from 'lodash'

export const SayHelloContext = createContext<{
  name: string
  sayHello: () => string
  setName: Dispatch<SetStateAction<string>>
}>(
  /**
   * This is default values for data stored in context
   */
  {
    name: '',
    sayHello: () => '',
    setName: noop,
  },
)

const SayHelloProvider: FC = ({ children }) => {
  const [name, setName] = useState('')

  const sayHello = () => {
    if (name) {
      return `Hi, ${name}`
    }
    return 'Hi, what is your name?'
  }

  const values = {
    sayHello,
    name,
    setName,
  }

  return <SayHelloContext.Provider value={values}>{children}</SayHelloContext.Provider>
}

export default SayHelloProvider

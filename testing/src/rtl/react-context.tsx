import React, { FC } from 'react'

const NameContext = React.createContext('Unknown')

const NameProvider: FC<{ first: string; last: string }> = ({ children, first, last }) => {
  const fullName = `${first} ${last}`
  return <NameContext.Provider value={fullName}>{children}</NameContext.Provider>
}

const NameConsumer = () => (
  <NameContext.Consumer>{value => <div>My Name Is: {value}</div>}</NameContext.Consumer>
)

export { NameContext, NameConsumer, NameProvider }

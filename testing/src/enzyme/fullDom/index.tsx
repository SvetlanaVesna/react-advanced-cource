import React, { FC } from 'react'

const Foo: FC<{ bar: any }> = ({ bar }) => {
  return <p>{bar}</p>
}
export default Foo

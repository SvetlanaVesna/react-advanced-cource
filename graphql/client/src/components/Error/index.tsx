import React from 'react'
import { ApolloError } from '@apollo/client/errors'

const ErrorComponent = ({ error }: { error: ApolloError }) => {
  return (
    <div>
      <p>
        <strong>Message: </strong>
        {error.message}
      </p>
      <br />

      {error.graphQLErrors.map(item => (
        <div>
          <p>
            <strong>Original Error: </strong>
            {item.originalError}
          </p>
          <br />
          <p>
            <strong>Path: </strong>
            {item.path}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ErrorComponent

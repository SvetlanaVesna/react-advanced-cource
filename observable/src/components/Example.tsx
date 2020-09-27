import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createFetchUserAction, createAbortFetchUserAction } from '../actions'

// Component
const Example: FC = () => {
  const dispatch = useDispatch()
  // @ts-ignore
  const user = useSelector(state => state.user)

  return (
    <div>
      <button onClick={() => dispatch(createFetchUserAction('simonhorlick'))}>
        fetch user
      </button>
      <button onClick={() => dispatch(createAbortFetchUserAction())}>
        abort fetch user
      </button>
      <div>Loading: {`${user.isLoading}`}</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default Example

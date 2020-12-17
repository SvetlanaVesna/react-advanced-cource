import * as actionTypes from '../actionTypes/race'

export default (prevState = {}, action: { type: any; users?: any; error?: any }) => {
  switch (action.type) {
    case actionTypes.GET_DATA_RACE:
      return Object.assign({}, prevState, { isFetching: true })
    case actionTypes.GET_DATA_RACE_SUCCESS:
      return Object.assign({}, prevState, { isFetching: false })
    case actionTypes.CANCEL_TASK:
      return Object.assign({}, prevState, { isFetching: false }, { users: action.users })
    default:
      return prevState
  }
}

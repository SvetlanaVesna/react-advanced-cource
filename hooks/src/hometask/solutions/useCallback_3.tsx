import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../utils'

function useSafeDispatch(dispatch: { (value: any): void; (arg0: any): any }) {
  const mountedRef = useRef(false)

  // to make this even more generic you should use the useLayoutEffect hook to
  // make sure that you are correctly setting the mountedRef.current immediately
  // after React updates the DOM. Even though this effect does not interact
  // with the dom another side effect inside a useLayoutEffect which does
  // interact with the dom may depend on the value being set
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return useCallback((...args) => (mountedRef.current ? dispatch(args) : void 0), [
    dispatch,
  ])
}

function asyncReducer(_state: any, action: { type: any; data?: any; error?: any }) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null }
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null }
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync(initialState: { status: string }) {
  const [state, unsafeDispatch] = useReducer(asyncReducer, {
    ...initialState,
    status: 'idle',
    data: null,
    error: null,
  })

  const dispatch = useSafeDispatch(unsafeDispatch)

  const { data, error, status } = state

  const run = useCallback(
    (promise) => {
      dispatch({ type: 'pending' })
      promise.then(
        (data: any) => {
          dispatch({ type: 'resolved', data })
        },
        (error: any) => {
          dispatch({ type: 'rejected', error })
        },
      )
    },
    [dispatch],
  )

  return {
    error,
    status,
    data,
    run,
  }
}

function PokemonInfo({ pokemonName }: { pokemonName: string }) {
  const { data: pokemon, status, error, run } = useAsync({
    status: pokemonName ? 'pending' : 'idle',
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    run(fetchPokemon(pokemonName))
  }, [pokemonName, run])

  if (status === 'idle') {
    return <>Submit a pokemon</>
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = useState('')

  function handleSubmit(newPokemonName: SetStateAction<string>) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={(e) => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox

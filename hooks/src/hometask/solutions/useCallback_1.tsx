import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../utils'

function asyncReducer(
  _state: any,
  action: { type: string; pokemon?: object; error?: string; data?: object },
) {
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

function useAsync(
  asyncCallback: { (): Promise<object> | undefined; (): object | undefined },
  initialState: { status: string; data?: null; error?: null },
  dependencies: React.DependencyList | undefined,
) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    ...initialState,
    status: 'idle',
    data: null,
    error: null,
  })

  React.useEffect(() => {
    const promise = asyncCallback()
    if (!promise) {
      return
    }
    dispatch({ type: 'pending' })
    promise.then(
      (data: any) => {
        dispatch({ type: 'resolved', data })
      },
      (error: any) => {
        dispatch({ type: 'rejected', error })
      },
    )
    // too bad the eslint plugin can't statically analyze this :-(
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return state
}

function PokemonInfo({ pokemonName }: { pokemonName: string }) {
  const state = useAsync(
    () => {
      if (!pokemonName) {
        return
      }
      return fetchPokemon(pokemonName)
    },
    { status: pokemonName ? 'pending' : 'idle' },
    [pokemonName],
  )

  const { data: pokemon, status, error } = state

  if (status === 'idle') {
    return <>'Submit a pokemon'</>
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
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: React.SetStateAction<string>) {
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

import React, { useState, useRef, BaseSyntheticEvent } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const formatDate = (date: Date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds(),
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

// the delay argument is for faking things out a bit
function fetchPokemon(name: string, delay = 1500) {
  return window
    .fetch('http://localhost:3000/allPokemon', {
      method: 'GET',
      headers: {
        delay: delay.toString(),
      },
    })
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        const pokemon = data[name]
        if (pokemon) {
          pokemon.fetchedAt = formatDate(new Date())
          return pokemon
        } else {
          return Promise.reject(new Error(`No pokemon with the name "${name}"`))
        }
      } else {
        // handle the graphql errors
        const error = {
          message: data?.errors?.map((e: Error) => e.message).join('\n'),
        }
        return Promise.reject(error)
      }
    })
}

function PokemonInfoFallback({ name }: { name: string }) {
  const initialName = useRef(name).current
  const fallbackPokemonData = {
    name: initialName,
    number: 'XXX',
    attacks: {
      special: [
        { name: 'Loading Attack 1', type: 'Type', damage: 'XX' },
        { name: 'Loading Attack 2', type: 'Type', damage: 'XX' },
      ],
    },
    fetchedAt: 'loading...',
  }
  return <PokemonDataView pokemon={fallbackPokemonData} />
}

function PokemonDataView({
  pokemon,
}: {
  pokemon?: {
    name: string
    number: string
    attacks: {
      special: { name: string; type: string; damage: string }[]
    }
    fetchedAt: string
  } | null
}) {
  return (
    <div>
      <section>
        <h2>
          {pokemon?.name}
          <sup>{pokemon?.number}</sup>
        </h2>
      </section>
      <section>
        <ul>
          {pokemon?.attacks.special.map((attack) => (
            <li key={attack.name}>
              <label>{attack.name}</label>:{' '}
              <span>
                {attack.damage} <small>({attack.type})</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <small className="pokemon-info__fetch-time">{pokemon?.fetchedAt}</small>
    </div>
  )
}

function PokemonForm({
  pokemonName: externalPokemonName,
  initialPokemonName = externalPokemonName || '',
  onSubmit,
}: {
  pokemonName: string
  initialPokemonName?: string
  onSubmit: (name: string) => void
}) {
  const [pokemonName, setPokemonName] = useState(initialPokemonName)

  function handleChange(e: BaseSyntheticEvent) {
    setPokemonName(e.target.value)
  }

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault()
    onSubmit(pokemonName)
  }

  function handleSelect(newPokemonName: string) {
    setPokemonName(newPokemonName)
    onSubmit(newPokemonName)
  }

  return (
    <form onSubmit={handleSubmit} className="pokemon-form">
      <label htmlFor="pokemonName-input">Pokemon Name</label>
      <small>
        Try{' '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('pikachu')}
        >
          "pikachu"
        </button>
        {', '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('charizard')}
        >
          "charizard"
        </button>
        {', or '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('mew')}
        >
          "mew"
        </button>
      </small>
      <div>
        <input
          className="pokemonName-input"
          id="pokemonName-input"
          name="pokemonName"
          placeholder="Pokemon Name..."
          value={pokemonName}
          onChange={handleChange}
        />
        <button type="submit" disabled={!pokemonName.length}>
          Submit
        </button>
      </div>
    </form>
  )
}

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div role="alert">
      There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function PokemonErrorBoundary(props: any) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />
}

export {
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
}

import React from 'react'

function areEqual(prevProps: any, nextProps: any) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render, otherwise return false
  */
  console.log(prevProps, nextProps)
  return Object.is(prevProps, nextProps)
}
const Weather = ({ weather }: { weather: { city: string; temperature: number } }) => {
  return (
    <div>
      <p>
        In {weather.city} {weather.temperature} degrees
      </p>
      {console.log('Render')}
    </div>
  )
}

export default React.memo(Weather, areEqual)

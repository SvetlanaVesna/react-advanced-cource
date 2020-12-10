import React, { useState } from 'react'

// @ts-ignore
function ScrollingDown({ isScrollingDown, prevRow, row }) {
  console.log('ScrollingDown', isScrollingDown, prevRow, row)
  return (
    <div>
      {`Scrolling down: ${isScrollingDown}`}
      <br />
      {`prevRow: ${prevRow}`}
      <br />
      {`row: ${row}`}
    </div>
  )
}

/* Notice that when you increment the row,
ScrollView renders twice but ScrollingDown only renders once receiving only the last version of ScrollView's state.
 */

// @ts-ignore
function ScrollView({ row }) {
  let [isScrollingDown, setIsScrollingDown] = useState(false)
  let [prevRow, setPrevRow] = useState(null)

  if (row !== prevRow) {
    // Row changed since last render. Update isScrollingDown.
    // @ts-ignore
    setIsScrollingDown(prevRow !== null && row > prevRow)
    setPrevRow(row)
  }
  console.log('ScrollView', isScrollingDown, prevRow, row)
  return <ScrollingDown isScrollingDown={isScrollingDown} prevRow={prevRow} row={row} />
}

function App() {
  const [row, setRow] = useState(1)
  return (
    <div className="App">
      <ScrollView row={row} />
      <button onClick={() => setRow((prev) => prev + 1)}>Increment Row</button>
    </div>
  )
}

export default App

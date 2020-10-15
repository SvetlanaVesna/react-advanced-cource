import React from 'react'
import { render, screen } from '@testing-library/react'

// getByLabelText
test('test', () => {
  render(
    <label>
      Username
      <input />
    </label>,
  )
  const inputNode = screen.findByLabelText('Username')
  expect(inputNode).toBeDefined()
})

// getByPlaceholderText
test('test', () => {
  render(<input placeholder="Username" />)
  const inputNode = screen.findByPlaceholderText('Username')
  expect(inputNode).toBeDefined()
})

// getByText
test('test', () => {
  render(<a href="/about">About</a>)
  const aboutAnchorNode = screen.getByText(/about/i)
  expect(aboutAnchorNode).toBeDefined()
})
// getByAltText
test('test', () => {
  render(<img alt="Incredibles 2 Poster" src="/incredibles-2.png" />)
  const incrediblesPosterImg = screen.findByAltText(/incredibles.*? poster/i)
  expect(incrediblesPosterImg).toBeDefined()
})

// getByTitle
test('test', () => {
  render(
    <>
      <span title="Delete" id="2">
        Delete
      </span>
      <svg>
        <title>Close</title>
        <g>
          <path />
        </g>
      </svg>
    </>,
  )
  const deleteElement = screen.findByTitle('Delete')
  const closeElement = screen.findByTitle('Close')
  expect(deleteElement).toBeDefined()
  expect(closeElement).toBeDefined()
})

// queryByDisplayValue
test('test', () => {
  render(
    <select value="2" onChange={() => {}}>
      <option value="1">one</option>
      <option value="2">two</option>
    </select>,
  )
  const selectedValue = screen.queryByDisplayValue('two') // NOT 2
  expect(selectedValue).not.toBeNull()
})

// getByTestId
test('test', () => {
  render(<div data-testid="custom-element" />)
  const element = screen.getByTestId('custom-element')
  expect(element).toBeDefined()
})

// findByRole
describe('test', () => {
  it('find by role', () => {
    render(<div role="dialog">test</div>)
    const dialogContainer = screen.findByRole('dialog')
    expect(dialogContainer).toBeDefined()
  })
})

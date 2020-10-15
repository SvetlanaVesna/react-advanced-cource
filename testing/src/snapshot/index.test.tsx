import React from 'react'
import { NameProvider } from '../rtl/react-context'
import renderer from 'react-test-renderer'

describe('snapshot test NameProvider', () => {
  test('toMatchSnapshot', () => {
    const tree = renderer.create(
      <NameProvider first="first" last="last">
        <p>ololo</p>
      </NameProvider>,
    )
    expect(tree).toMatchSnapshot()
  })

  test('renders correctly', () => {
    const tree = renderer.create(<a href="http://www.facebook.com">Facebook</a>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

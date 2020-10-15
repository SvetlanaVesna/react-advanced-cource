import React from 'react'
import { render } from 'enzyme'
import { Bar } from '../index'

describe('<Foo />', () => {
  it('renders three `.in-foo`s', () => {
    const wrapper = render(<Bar />)
    expect(wrapper.find('.in-foo')).toHaveLength(3)
  })
})

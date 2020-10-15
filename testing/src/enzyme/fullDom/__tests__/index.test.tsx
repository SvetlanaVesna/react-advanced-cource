import React from 'react'
import { mount } from 'enzyme'
import Foo from '../index'

describe('<Foo />', () => {
  test('allows us to set props', () => {
    const wrapper = mount(<Foo bar="baz" />)
    expect(wrapper.props().bar).toEqual('baz')
    wrapper.setProps({ bar: 'foo' })
    expect(wrapper.props().bar).toEqual('foo')
  })
})

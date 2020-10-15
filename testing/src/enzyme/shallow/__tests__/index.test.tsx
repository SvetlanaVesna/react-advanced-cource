import React from 'react'
import { shallow } from 'enzyme'
import { HiddenMessage } from '../index'

test('shallow', () => {
  const wrapper = shallow(<HiddenMessage initialShow={true} />)
  expect(wrapper.find('Fade').props()).toEqual({
    in: true,
    children: <div>Hello world</div>,
  })
  wrapper.find('button').simulate('click')
  expect(wrapper.find('Fade').props()).toEqual({
    in: false,
    children: <div>Hello world</div>,
  })
})

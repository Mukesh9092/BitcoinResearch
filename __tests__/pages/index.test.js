import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import Page from '../../pages/index'

describe('Test1', () => {
  it('Assertion1', () => {
    const page = shallow(
      <Page
        url={{
          pathname: '/'
        }}
      />
    )
    const text = page
      .find('p')
      .text()

    const expected = 'Hello, World!'
    const actual = text

    expect(actual).toEqual(expected)
  })
})

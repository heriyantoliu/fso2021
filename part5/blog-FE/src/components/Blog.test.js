import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render Note', () => {
  const blog = {
    title: 'Title 1',
    author: 'Author 1',
    url: 'abc',
    likes: 2,
  }

  // const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('Title 1 Author 1')

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)

  const div2 = component.container.querySelector('.togglableContent')
  expect(div2).not.toHaveStyle('display: none')
})

import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'

test('by default only blog and title render', () => {
  const blog = {
    title:'Component testing is done with react-testing-library',
    author:'Nikita',
    url:'https://gorila.ua.com',
    user:'6710004017358ca8ede595f5'
  }

  const { container } = render(<Blog blog={blog}></Blog>)

  const title = screen.getByText('Component testing is done with react-testing-library')
  expect(title).toBeDefined()

  const author = screen.getByText('Nikita')
  expect(author).toBeDefined()

  const unvisible = container.querySelector('#unvisible')

  const url = container.querySelector('#url')
  expect(unvisible).toContain(url)

  const likes = container.querySelector('#likes')
  expect(unvisible).toContain(likes)
})
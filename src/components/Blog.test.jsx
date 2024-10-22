import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

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

test('when button view clicked, url and likes are shown', async() => {
  const blog = {
    title:'Component testing is done with react-testing-library',
    author:'Nikita',
    url:'https://gorila.ua.com',
    user:'6710004017358ca8ede595f5'
  }

  const user = userEvent.setup()

  const toggleVisibility = vi.fn()

  const { container } = render(<Blog blog={blog} toggleVisibility={toggleVisibility}></Blog>)

  const viewBtn = container.querySelector('#view-btn')

  await user.click(viewBtn) // <-------------

  expect(toggleVisibility).toHaveBeenCalledTimes(1)
})

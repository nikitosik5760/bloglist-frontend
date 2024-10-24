import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

test('create blog', async() => {
  const createBlog = vi.fn()
  const setErrorMessage = vi.fn()

  const { container } = render(<BlogForm createBlog={createBlog} setErrorMessage={setErrorMessage}></BlogForm>)
  screen.debug()

  const user = userEvent.setup()

  const titleInput = container.querySelector('#title')
  await user.type(titleInput, 'test title')

  const authorInput = container.querySelector('#author')
  await user.type(authorInput, 'test author')

  const urlInput = container.querySelector('#url')
  await user.type(urlInput, 'test url')

  const submit = container.querySelector('#submit')
  screen.debug()
  await user.click(submit)

  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    'author': 'test author',
    'title': 'test title',
    'url': 'test url',
  })
})
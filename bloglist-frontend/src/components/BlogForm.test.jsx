/** @format */
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { describe } from 'vitest'
// import { describe, expect, test, vi } from 'vitest'

describe('BlogForm tests', () => {
	test('Return same blog details as inserted', async () => {
		const mockCreateBlog = vi.fn()
		const comp = render(<BlogForm createBlog={mockCreateBlog} />)

		const newBlog = {
			title: 'Error on line 68, but I have 18 lines of code',
			author: 'Doggus Confusicus',
			url: 'moc.test.lru',
		}

		const user = userEvent.setup()
		const inputTitle = comp.getByPlaceholderText(`Blog title`)
		const inputAuthor = comp.getByPlaceholderText(`Blog author`)
		const inputUrl = comp.getByPlaceholderText(`Blog link`)
		const sendButton = comp.getByText('create')

		// comp.debug()
		await user.type(inputTitle, newBlog.title)
		await user.type(inputAuthor, newBlog.author)
		await user.type(inputUrl, newBlog.url)
		await user.click(sendButton)

		expect(mockCreateBlog.mock.calls).toHaveLength(1)
		expect(mockCreateBlog.mock.calls[0][0]).toEqual(newBlog)
	})
})

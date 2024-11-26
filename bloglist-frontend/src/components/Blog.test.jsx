/** @format */

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

import { beforeEach, describe, expect, vi } from 'vitest'

describe('Blog tests', () => {
	let blog, comp
	let mockUpdateLikes = vi.fn()
	let mockViewToggle = vi.fn()

	beforeEach(() => {
		blog = {
			title: 'Pattern Reacts',
			author: 'Chan Michael',
			url: 'com.patternsreact',
			likes: 1,
			user: {
				username: 'Tester',
			},
		}
		comp = render(
			<Blog
				blog={blog}
				toggleView={mockViewToggle}
				updateBlog={mockUpdateLikes}
			/>
		)
	})

	test('render title', () => {
		expect(comp.getByText(blog.title, { exact: false })).toBeDefined()
	})

	test('url, likes, and user are hidden by default', () => {
		const url = comp.queryByText(blog.url, { exact: false })
		const likes = comp.queryByText(blog.likes, { exact: false })
		const username = comp.queryByTestId(blog.user.username, { exact: false })

		expect(url, likes, username).not.toBeVisible()
	})

	test('view button reveals url, likes, and user', async () => {
		const user = userEvent.setup()
		const buttonView = comp.getByText('View')
		await user.click(buttonView)

		const url = comp.getByText(blog.url, { exact: false })
		const likes = comp.getByText(blog.likes, { exact: false })
		const username = comp.getByText(blog.user.username, { exact: false })

		expect(url, likes, username).toBeVisible()
	})

	test('pressing like button twice returns two events', async () => {
		const buttonLike = comp.container.querySelector('.buttonLike')
		const user = userEvent.setup()
		const buttonView = comp.getByText('View')
		await user.click(buttonView)
		await user.dblClick(buttonLike)
		expect(mockUpdateLikes.mock.calls).toHaveLength(2)
	})
})

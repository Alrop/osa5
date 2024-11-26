/** @format */

import { useState } from 'react'

function BlogForm({ createBlog }) {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		await createBlog({ title, author, url })
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h3>Create a new blog post</h3>
			<form onSubmit={handleSubmit}>
				<div>
					Title:{' '}
					<input
						id='title'
						value={title}
						name='title'
						placeholder='Blog title'
						onChange={({ target }) => setTitle(target.value)}></input>
				</div>
				<div>
					Author:{' '}
					<input
						id='author'
						value={author}
						name='author'
						placeholder='Blog author'
						onChange={({ target }) => setAuthor(target.value)}></input>
				</div>
				<div>
					Url:{' '}
					<input
						id='url'
						value={url}
						name='url'
						placeholder='Blog link'
						onChange={({ target }) => setUrl(target.value)}></input>
				</div>
				<button id='create' type='submit'>
					create
				</button>
			</form>
		</div>
	)
}

export default BlogForm

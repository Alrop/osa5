/** @format */

import { useState } from 'react'

function Blog({ blog, updateBlog, deleteBlog, isPoster }) {
	const blogStyle = {
		paddingTop: 8,
		paddingBottom: 2,

		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const [visible, setVisible] = useState(false)
	const hideWhenVisible = { display: visible ? '' : 'none' }
	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleLikes = async () => {
		const blogToUpdate = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
		}
		await updateBlog(blog.id, blogToUpdate)
	}

	const handeDelete = () => {
		if (window.confirm(`Do you wish to delete ${blog.title}?`)) {
			deleteBlog(blog)
		}
	}

	const fullView = () => {
		return (
			<div>
				<p>Blog ID {blog.id}</p>
				<p>Link: {blog.url}</p>
				<p>
					Likes: {<span data-testid='blogLikes'>{blog.likes}</span>}{' '}
					<button className={'buttonLike'} onClick={handleLikes}>
						Like{' '}
					</button>
				</p>
				{blog.user ? <p>User: {blog.user.username}</p> : <p>User: Unknown</p>}

				{isPoster && (
					<div>
						<button
							className={'buttonDelete'}
							style={{ backgroundColor: '#ed4337' }}
							onClick={handeDelete}>
							Delete blog
						</button>
					</div>
				)}
			</div>
		)
	}

	return (
		<div style={blogStyle}>
			{blog.title} by {blog.author}{' '}
			<button onClick={toggleVisibility}>View</button>
			<div style={hideWhenVisible}>{fullView()}</div>
		</div>
	)
}

export default Blog

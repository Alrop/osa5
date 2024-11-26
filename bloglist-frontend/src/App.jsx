/** @format */

import { useState, useEffect, useRef } from 'react'
import '../index.css'

import Notification from './components/Notifications'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)
	const [refresh, setRefresh] = useState(false)

	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then((initBlogs) => {
			initBlogs.sort((a, b) => b.likes - a.likes)
			setBlogs(initBlogs)
		})
	}, [refresh])

	useEffect(() => {
		const storedUserJSON = window.localStorage.getItem('loggedUser')
		if (storedUserJSON) {
			const user = JSON.parse(storedUserJSON)
			blogService.setToken(user.token)
			setUser(user)
		}
	}, [])

	// automatically clear messages after 5sec
	useEffect(() => {
		setTimeout(() => {
			setMessage(null)
		}, 5000)
	}, [message])

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
			setMessage({
				text: `Logged in as ${username}`,
				type: 'success',
			})
		} catch (error) {
			console.log(error.response)
			setMessage({
				text: 'Invalid credentials',
				type: 'error',
			})
		}
	}

	const createBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			const res = await blogService.createBlog(blogObject)
			setBlogs(blogs.concat(res))
			setRefresh(!refresh)

			setMessage({
				text: `Succesfully created a blog "${blogObject.title}"`,
				type: 'success',
			})
		} catch (error) {
			console.log(error)
			setMessage({
				text: `Failed to add blog`,
				type: 'error',
			})
		}
	}

	// async function updateBlog(id, blogObject) {
	// 	try {
	// 		await blogService.updateBlog(id, blogObject)
	// 		setRefresh(!refresh)
	// 		setMessage({
	// 			text: `Added like to ${blogObject.title}`,
	// 			type: 'success',
	// 		})
	// 	} catch (error) {
	// 		console.log(error)
	// 		setMessage({
	// 			text: 'Failed to update likes',
	// 			type: 'error',
	// 		})
	// 	}
	// }
	const updateBlog = async (id, blogObject) => {
		try {
			await blogService.updateBlog(id, blogObject)
			setRefresh(!refresh)
			setMessage({
				text: `Added like to ${blogObject.title}`,
				type: 'success',
			})
		} catch (error) {
			console.log(error)
			setMessage({
				text: 'Failed to update likes',
				type: 'error',
			})
		}
	}

	const deleteBlog = async (blogObject) => {
		try {
			await blogService.deleteBlog(blogObject.id)
			setRefresh(!refresh)
			setMessage({
				text: `Blog titled ${blogObject.title} was removed`,
				type: 'success',
			})
		} catch (error) {
			console.log(error)
			setMessage({
				text: `Failed to delete blog ${blogObject.title} `,
				type: 'error',
			})
		}
	}

	const logout = () => {
		window.localStorage.removeItem('loggedUser')
		setUser(null)
		setMessage({
			text: `Logged out`,
			type: 'success',
		})
	}

	return (
		<div>
			<Notification message={message} />

			{user === null ? (
				<div>
					<Toggleable buttonLabel='Log in'>
						<LoginForm
							handleLogin={handleLogin}
							username={username}
							password={password}
							handleUsernameChange={({ target }) => setUsername(target.value)}
							handlePasswordChange={({ target }) => setPassword(target.value)}
						/>
					</Toggleable>
				</div>
			) : (
				<div>
					<h2>blogs</h2>
					<div data-testid='greeting'>
						Logged in as {user.username}{' '}
						<button onClick={logout}>Logout</button>
					</div>
					<Toggleable buttonLabel='New blog' ref={blogFormRef}>
						<BlogForm createBlog={createBlog} />
					</Toggleable>
					<h3>Published blogs:</h3>
					<div>
						{blogs.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								updateBlog={updateBlog}
								deleteBlog={deleteBlog}
								isPoster={blog.user && blog.user.username === user.username}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default App

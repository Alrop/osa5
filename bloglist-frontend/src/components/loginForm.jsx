/** @format */

import PropTypes from 'prop-types'

const LoginForm = ({
	handleLogin,
	username,
	password,
	handleUsernameChange,
	handlePasswordChange,
}) => {
	return (
		<form onSubmit={handleLogin}>
			<div>
				Username:
				<input
					data-testid='username'
					id='username'
					value={username}
					onChange={handleUsernameChange}
				/>
			</div>
			<div>
				Password:
				<input
					data-testid='password'
					id='password'
					value={password}
					onChange={handlePasswordChange}
				/>
			</div>
			<button data-testid='buttonLogin' type='submit' onClick={handleLogin}>
				login
			</button>
		</form>
	)
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
}

export default LoginForm

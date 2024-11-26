/** @format */

import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : 'block' }
	const showWhenVisible = { display: visible ? 'block' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return { toggleVisibility }
	})

	return (
		<div>
			<div style={hideWhenVisible} className='toggleableContent'>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button data-testid='buttonCancel' onClick={toggleVisibility}>
					cancel
				</button>
			</div>
		</div>
	)
})
Toggleable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	children: PropTypes.node,
}
Toggleable.displayName = 'Togglable'

export default Toggleable

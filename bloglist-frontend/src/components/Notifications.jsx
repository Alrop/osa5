/** @format */

function Notification({ message }) {
	if (message === null) {
		return null
	}
	return (
		<div data-testid='notification' className={`notification ${message.type}`}>
			{message.text}
		</div>
	)
}
export default Notification

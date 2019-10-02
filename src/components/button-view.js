import React from "react"

const ButtonView = props => {
	let { label, onClick } = props
	return (
		<div className="control-group">
			<div id="button-view" className="controls">
				<button id="submit" name="submit" className="btn btn-primary" onClick={onClick}>
					{label}
				</button>
			</div>
		</div>
	)
}

export default ButtonView

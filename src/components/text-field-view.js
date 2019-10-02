import React, { useState } from "react"

const TextFieldView = props => {
	let { label, property, value, onChange, children } = props
	let [childrenVisibility, setChildrenVisibility] = useState(false)

	let handleInfoClick = () => {
		setChildrenVisibility(!childrenVisibility)
	}

	let handleTextChange = event => {
		onChange(property, event.target.value)
	}

	let renderIcon
	if (children) {
		renderIcon = <i className="icon-question-sign" onClick={handleInfoClick} />
	}

	let renderChildren
	if (children && childrenVisibility) {
		renderChildren = <div className="help-block">{children}</div>
	}

	return (
		<div className="control-group">
			<label className="control-label" htmlFor={property}>
				{label}
			</label>
			<div className="controls">
				<input
					id={property}
					name={property}
					type="text"
					placeholder=""
					className="input-mini"
					value={value}
					onChange={handleTextChange}
				/>
				{renderIcon}
				{renderChildren}
			</div>
		</div>
	)
}

export default TextFieldView

import React, { useState } from "react"

const TabTypeView = props => {
	let { property, label, type, value, onChange, children } = props
	let [childrenVisibility, setChildrenVisibility] = useState(false)

	let handleInfoClick = () => {
		setChildrenVisibility(!childrenVisibility)
	}

	let handleTypeChange = event => {
		onChange(property + ".type", event.target.value)
	}

	let handleValueChange = event => {
		onChange(property + ".value", event.target.value)
	}

	let renderIcon
	if (children) {
		renderIcon = <i className="icon-question-sign" onClick={handleInfoClick} />
	}

	let renderText
	if (children && childrenVisibility) {
		renderText = <div className="help-block">{children}</div>
	}

	let renderValue
	if (["exact", "approximate"].includes(type)) {
		renderValue = (
			<input
				id={property + "Value"}
				name={property + "Value"}
				type="text"
				placeholder=""
				className="input-mini"
				value={value}
				onChange={handleValueChange}
			/>
		)
	}

	let renderOptionWidth
	if (property !== "width.indent") {
		renderOptionWidth = <option value="width">Same as width</option>
	}

	let renderOptionDepth
	if (property !== "depth.indent") {
		renderOptionDepth = <option value="width">Same as depth</option>
	}

	let renderOptionHeight
	if (property !== "height.indent") {
		renderOptionHeight = <option value="width">Same as height</option>
	}

	return (
		<div className="control-group">
			<label className="control-label" htmlFor={property + "Type"}>
				{label}
			</label>
			<div className="controls">
				<select
					id={property + "Type"}
					name={property + "Type"}
					className="input-medium"
					value={type}
					onChange={handleTypeChange}
				>
					<option value="auto">Auto</option>
					<option value="exact">Exact</option>
					<option value="approximate">Approximate</option>
					{renderOptionWidth}
					{renderOptionHeight}
					{renderOptionDepth}
				</select>
				{renderValue}
				{renderIcon}
				{renderText}
			</div>
		</div>
	)
}

export default TabTypeView

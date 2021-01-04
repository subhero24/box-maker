import React from "react"

const ComboBoxView = (props) => {
	let { label, property, options, value, onChange } = props

	let handleChange = (event) => {
		onChange(property, event.target.value)
	}

	let optionsRender = []
	for (let key in options) {
		let value = options[key]
		let render = <option key={key}>{value}</option>

		optionsRender.push(render)
	}

	return (
		<div className="control-group">
			<label className="control-label" htmlFor={property}>
				{label}
			</label>
			<div className="controls">
				<select id={property} name={property} className="input-medium" value={value} onChange={handleChange}>
					{optionsRender}
				</select>
			</div>
		</div>
	)
}

export default ComboBoxView

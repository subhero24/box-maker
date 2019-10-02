import React from "react"

const ComboBoxView = props => {
	let { label, property, options, value, onChange } = props

	let handleChange = event => {
		onChange(property, event.target.value)
	}

	let renderOptions = Object.entries(options).map(([key, value]) => <option key={key}>{value}</option>)

	return (
		<div className="control-group">
			<label className="control-label" htmlFor={property}>
				{label}
			</label>
			<div className="controls">
				<select id={property} name={property} className="input-medium" value={value} onChange={handleChange}>
					{renderOptions}
				</select>
			</div>
		</div>
	)
}

export default ComboBoxView

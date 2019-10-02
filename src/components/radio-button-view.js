import React from "react"

const RadioButtonView = props => {
	let { label, property, options, value, onChange } = props

	let handleChange = event => {
		onChange(property, event.target.value)
	}

	let renderOptions = Object.entries(options).map(([key, val], index) => {
		let id = `${property}-${index}`
		return (
			<label key={key} className="radio" htmlFor={id}>
				<input
					id={id}
					type="radio"
					name={property}
					value={key}
					checked={value === key}
					onChange={handleChange}
				/>
				{val}
			</label>
		)
	})

	return (
		<div className="control-group">
			<label className="control-label" htmlFor={property}>
				{label}
			</label>
			<div className="controls">{renderOptions}</div>
		</div>
	)
}
export default RadioButtonView

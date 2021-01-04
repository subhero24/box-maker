import React from "react"

const RadioButtonView = (props) => {
	let { label, property, options, value, onChange } = props

	let handleChange = (event) => {
		onChange(property, event.target.value)
	}

	let index = 0
	let optionsRender = []
	for (let key in options) {
		let id = `${property}-${index}`
		let val = options[key]
		let render = (
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

		index++
		optionsRender.push(render)
	}

	return (
		<div className="control-group">
			<label className="control-label" htmlFor={property}>
				{label}
			</label>
			<div className="controls">{optionsRender}</div>
		</div>
	)
}
export default RadioButtonView

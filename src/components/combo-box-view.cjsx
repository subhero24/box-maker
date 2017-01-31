React = require 'react'

class ComboBoxView extends React.PureComponent
	changeHandler: (evt) =>
		@props.onChange(@props.property, evt.target.value)

	render: ->
		options = for key, value of @props.options
			<option key={key}>{value}</option>

		<div className="control-group">
			<label className="control-label" htmlFor={@props.property}>{@props.label}</label>
			<div className="controls">
				<select id={@props.property} name={@props.property} className="input-medium" value={@props.value} onChange={@changeHandler}>
					{options}
				</select>
			</div>
		</div>

module.exports = ComboBoxView

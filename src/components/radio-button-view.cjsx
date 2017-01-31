React = require 'react'

class RadioButtonView extends React.PureComponent
	changeHandler: (evt) =>
		@props.onChange(@props.property, evt.target.value)

	render: ->
		index = 0
		options = for key, value of @props.options
			<label key={key} className="radio" htmlFor={"#{@props.property}-#{index}"} >
				<input type="radio" name={@props.property} id={"#{@props.property}-#{index++}"} value={key} checked={@props.value is key} onChange={@changeHandler} />{value}
			</label>

		<div className="control-group">
			<label className="control-label" htmlFor={@props.property}>{@props.label}</label>
			<div className="controls">
				{options}
			</div>
		</div>

module.exports = RadioButtonView

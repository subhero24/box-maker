React = require 'react'

class TabTypeView extends React.PureComponent
	constructor: ->
		@state =
			showInfo: no

	infoClickHandler: (evt) =>
		@setState { showInfo: !@state.showInfo }

	typeChangeHandler: (evt) =>
		@props.onChange(@props.property + '.type', evt.target.value)

	valueChangeHandler: (evt) =>
		@props.onChange(@props.property + '.value', evt.target.value)

	render: ->

		icon = <i className="icon-question-sign" onClick={@infoClickHandler} /> if @props.info
		text = <div className="help-block" dangerouslySetInnerHTML={{ __html: @props.info }} /> if @props.info and @state.showInfo
		value = <input id={@props.property + 'Value'} name={@props.property + 'Value'} type="text" placeholder="" className="input-mini" value={@props.value} onChange={@valueChangeHandler} /> if @props.type in ['exact', 'approximate']

		optionWidth = <option value="width">Same as width</option> if @props.property isnt 'width.indent'
		optionDepth = <option value="depth">Same as depth</option> if @props.property isnt 'depth.indent'
		optionHeight = <option value="height">Same as height</option> if @props.property isnt 'height.indent'

		<div className="control-group">
			<label className="control-label" htmlFor={@props.property + 'Type'}>{@props.label}</label>
			<div className="controls">
				<select id={@props.property + 'Type'} name={@props.property + 'Type'} className="input-medium" value={@props.type} onChange={@typeChangeHandler}>
					<option value="auto">Auto</option>
					<option value="exact">Exact</option>
					<option value="approximate">Approximate</option>
					{optionWidth}
					{optionHeight}
					{optionDepth}
				</select>
				{value}{icon}
				{text}
			</div>
		</div>

module.exports = TabTypeView

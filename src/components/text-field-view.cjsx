React = require 'react'

class TextFieldView extends React.PureComponent
	constructor: ->
		@state =
			showInfo: no

	infoClickHandler: (evt) =>
		@setState { showInfo: !@state.showInfo }

	textChangeHandler: (evt) =>
		@props.onChange(@props.property, evt.target.value)

	render: ->
		if @props.info
			icon = <i className="icon-question-sign" onClick={@infoClickHandler} />

		if @props.info and @state.showInfo
			text = <div className="help-block" dangerouslySetInnerHTML={{ __html: @props.info }} />

		<div className="control-group">
			<label className="control-label" htmlFor={@props.property}>{@props.label}</label>
			<div className="controls">
				<input id={@props.property} name={@props.property} type="text" placeholder="" className="input-mini" value={@props.value} onChange={@textChangeHandler} />
				{icon}{text}
			</div>
		</div>

module.exports = TextFieldView

React = require 'react'

class ButtonView extends React.PureComponent
	render: ->
		<div className="control-group">
			<div id="button-view" className="controls">
				<button id="submit" name="submit" className="btn btn-primary" onClick={@props.onClick}>{@props.label}</button>
			</div>
		</div>

module.exports = ButtonView

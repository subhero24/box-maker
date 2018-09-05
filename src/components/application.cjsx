React = require 'react'
Style = require 'src/style/main'

Box = require 'src/box'
Indent = require 'src/indent'
Sketchup = require 'src/sketchup'

ButtonView = require './button-view'
TabTypeView = require './tab-type-view'
ComboBoxView = require './combo-box-view'
TextFieldView = require './text-field-view'
RadioButtonView = require './radio-button-view'

class Application extends React.PureComponent
	constructor: ->
		@units =
			'mm': 'millimeters'
			'cm': 'centimeters'
			'inch': 'inches'

		@measurements =
			'inside': 'inside'
			'outside': 'outside'

		@types =
			'open': 'open'
			'closed': 'closed'

		@kerfingInfo = """
			<p>Kerfing is the width of material removed by the laser. The generated geometry will compensate for this to make it a tight fit.</p>
			<p>If the value is too high, the box may not fit. A kerfing value of 0 is guaranteed to fit, but may be too loose.</p>
			<p>A kerfing value of 0.1 millimeters, 0.01 centimeters or 0.004 inches is reasonable.</p>
		"""
		@tabTypeInfo = """
			<p>"Auto" calculates tab length based on material thickness. All tabs will be evenly distributed.</p>
			<p>"Approximate" is the same as auto, but calculated length will be as close as possible to the given length. Tabs will still be evenly distributed.</p>
			<p>"Exact" lets you choose the tab length yourself. Tabs against the edge may differ in length to accomodate for unused space or material thickness.</p>
			<p>"Same as ..." sets the tab length to the tab length of the other dimension.</p>
		"""
		@state =
			type: 'open'
			units: 'mm'
			kerfing: '0'
			thickness: '4'
			measurement: 'inside'
			width:
				length: '100'
				indent:
					type: 'auto'
					value: '10'
			depth:
				length: '100'
				indent:
					type: 'auto'
					value: '10'
			height:
				length: '100'
				indent:
					type: 'auto'
					value: '10'

	changePropertyHandler: (selector, value) =>
		[attributes..., property] = selector.split '.'
		state = object = Object.assign {}, @state
		for attribute in attributes
			object[attribute] = Object.assign {}, object[attribute]
			object = object[attribute]
		object[property] = value
		@setState state

	getConfiguration: =>
		type: @state.type
		units: @state.units
		kerfing: parseFloat(@state.kerfing)
		thickness: parseFloat(@state.thickness)
		measurement: @state.measurement
		width:
			dimension: 'x'
			length: parseFloat(@state.width.length)
			indent:
				type: @state.width.indent.type
				value: parseFloat(@state.width.indent.value)
		depth:
			dimension: 'y'
			length: parseFloat(@state.depth.length)
			indent:
				type: @state.depth.indent.type
				value: parseFloat(@state.depth.indent.value)
		height:
			dimension: 'z'
			length: parseFloat(@state.height.length)
			indent:
				type: @state.height.indent.type
				value: parseFloat(@state.height.indent.value)

	setIndentations: (state) =>
		state.width.indent = Indent(state.width.length + state.kerfing, state.thickness, state.width.indent.type, state.width.indent.value) if state.width.indent.type in ['auto', 'approximate', 'exact']
		state.depth.indent = Indent(state.depth.length + state.kerfing, state.thickness, state.depth.indent.type, state.depth.indent.value) if state.depth.indent.type in ['auto', 'approximate', 'exact']
		state.height.indent = Indent(state.height.length + state.kerfing, state.thickness, state.height.indent.type, state.height.indent.value) if state.height.indent.type in ['auto', 'approximate', 'exact']

		for cycle in [1,2]
			break if state.width.indent.length? and state.height.indent.length? and state.depth.indent.length?
			for property in ['width', 'depth', 'height']
				dimension = @state[property].indent.type
				if dimension in ['width', 'depth', 'height'] and state[dimension].indent?
					state[property].indent = Indent(state[property].length + state.kerfing, state.thickness, 'exact', state[dimension].indent.length)

		state.width.indent ?= Indent(state.width.length + state.kerfing, state.thickness, 'auto')
		state.depth.indent ?= Indent(state.depth.length + state.kerfing, state.thickness, 'auto')
		state.height.indent ?= Indent(state.height.length + state.kerfing, state.thickness, 'auto')
		return state

	submitHandler: (evt) =>
		config = @getConfiguration()
		config = @setIndentations(config)

		faces = Box(config)
		groups = for face in faces
			faces: [ { points: face, thickness: config.thickness * -1 } ]
			
		Sketchup({ unit: config.units, groups: groups })

	render: ->
		<div className="form-horizontal">
			<fieldset>
				<RadioButtonView value={@state.type} options={@types} property="type" label="Box" onChange={@changePropertyHandler}/>
				<RadioButtonView value={@state.units} options={@units} property="units" label="Units" onChange={@changePropertyHandler}/>
				<hr />
				<TextFieldView label="Width" property="width.length" value={@state.width.length} onChange={@changePropertyHandler} />
				<TabTypeView label="Tabs" property="width.indent" type={@state.width.indent.type} value={@state.width.indent.value} info={@tabTypeInfo} onChange={@changePropertyHandler} />
				<hr />
				<TextFieldView label="Height" property="height.length" value={@state.height.length} onChange={@changePropertyHandler} />
				<TabTypeView label="Tabs" property="height.indent" type={@state.height.indent.type} value={@state.height.indent.value} info={@tabTypeInfo} onChange={@changePropertyHandler} />
				<hr />
				<TextFieldView label="Depth" property="depth.length" value={@state.depth.length} onChange={@changePropertyHandler} />
				<TabTypeView label="Tabs" property="depth.indent" type={@state.depth.indent.type} value={@state.depth.indent.value} info={@tabTypeInfo} onChange={@changePropertyHandler} />
				<hr />
				<TextFieldView label="Thickness" property="thickness" value={@state.thickness} onChange={@changePropertyHandler} />
				<TextFieldView label="Kerfing" property="kerfing" value={@state.kerfing} info={@kerfingInfo} onChange={@changePropertyHandler} />
				<hr />
				<ButtonView label="Make a box!" onClick={@submitHandler} />
			</fieldset>
		</div>


module.exports = Application

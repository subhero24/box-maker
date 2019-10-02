import React, { useState, Fragment } from "react"

import Box from "/box"
import Indent from "/indent"
import Sketchup from "/sketchup"

import ButtonView from "/components/button-view"
import TabTypeView from "/components/tab-type-view"
import TextFieldView from "/components/text-field-view"
import RadioButtonView from "/components/radio-button-view"

const DIMENSIONS = ["width", "depth", "height"]

const UNITS = {
	mm: "millimeters",
	cm: "centimeters",
	inch: "inches",
}

const TYPES = {
	open: "open",
	closed: "closed",
}

const KerfingInfo = () => {
	return (
		<Fragment>
			<p>
				Kerfing is the width of material removed by the laser. The generated geometry will compensate for this
				to make it a tight fit.
			</p>
			<p>
				If the value is too high, the box may not fit. A kerfing value of 0 is guaranteed to fit, but may be too
				loose.
			</p>
			<p>A kerfing value of 0.1 millimeters, 0.01 centimeters or 0.004 inches is reasonable.</p>
		</Fragment>
	)
}

const TabTypeInfo = () => {
	return (
		<Fragment>
			<p>
				&quot;Auto&quot; calculates tab length based on material thickness. All tabs will be evenly distributed.
			</p>
			<p>
				&quot;Approximate&quot; is the same as auto, but calculated length will be as close as possible to the
				given length. Tabs will still be evenly distributed.
			</p>
			<p>
				&quot;Exact&quot; lets you choose the tab length yourself. Tabs against the edge may differ in length to
				accomodate for unused space or material thickness.
			</p>
			<p>&quot;Same as ...&quot; sets the tab length to the tab length of the other dimension.</p>
		</Fragment>
	)
}

const initialState = {
	type: "open",
	units: "mm",
	kerfing: "0",
	thickness: "4",
	width: {
		dimension: "x",
		length: "100",
		indent: {
			type: "auto",
			value: "10",
		},
	},
	depth: {
		dimension: "y",
		length: "100",
		indent: {
			type: "auto",
			value: "10",
		},
	},
	height: {
		dimension: "z",
		length: "100",
		indent: {
			type: "auto",
			value: "10",
		},
	},
}

let updateDeepAttribute = (object, selector, value) => {
	let parts = selector.split(".")
	let property = parts[parts.length - 1]
	let attributes = parts.slice(0, -1)
	for (let attribute of attributes) {
		object = object[attribute]
	}
	if (typeof value === "function") {
		object[property] = value(object[property])
	} else {
		object[property] = value
	}
}

let setFloats = state => {
	let dimensionSelectors = DIMENSIONS.map(dim => [dim + ".length", dim + ".indent.value"])
	let dimensionSelectorsFlattened = dimensionSelectors.reduce((acc, val) => [...acc, ...val])
	let selectors = ["kerfing", "thickness", ...dimensionSelectorsFlattened]

	for (let selector of selectors) {
		updateDeepAttribute(state, selector, parseFloat)
	}
}

let setIndentations = state => {
	// Calculate all indentations that do not depend on other dimensions
	for (let dim of DIMENSIONS) {
		if (["auto", "approximate", "exact"].includes(state[dim].indent.type)) {
			state[dim].indent.calculated = Indent(
				state[dim].length + state.kerfing,
				state.thickness,
				state[dim].indent.type,
				state[dim].indent.value,
			)
		}
	}

	// Calculate all indentations that depend on other dimensions
	for (let i = 1; i < DIMENSIONS.length; ++i) {
		if (DIMENSIONS.every(dim => state[dim].indent.calculated != undefined)) break

		for (let dim of DIMENSIONS) {
			let indentDim = state[dim].indent.type
			if (DIMENSIONS.includes(indentDim) && state[indentDim].indent.calculated) {
				state[dim].indent.calculated = Indent(
					state[dim].length + state.kerfing,
					state.thickness,
					"exact",
					state[indentDim].indent.calculated.length,
				)
			}
		}
	}

	for (let dim of DIMENSIONS) {
		if (state[dim].indent.calculated == undefined) {
			state[dim].indent.calculated = Indent(state[dim].calculated.length + state.kerfing, state.thickness, "auto")
		}
	}
}

const Application = () => {
	let [state, setState] = useState(initialState)

	let handlePropertyChange = (selector, value) => {
		setState(state => {
			let newState = JSON.parse(JSON.stringify(state))
			updateDeepAttribute(newState, selector, value)
			return newState
		})
	}

	let handleSubmit = () => {
		let config = JSON.parse(JSON.stringify(state))
		setFloats(config)
		setIndentations(config)

		debugger

		let groups = Box(config).map(face => {
			return {
				faces: [{ points: face, thickness: config.thickness * -1 }],
			}
		})

		Sketchup({ unit: config.units, groups })
	}

	return (
		<div className="form-horizontal">
			<fieldset>
				<RadioButtonView
					value={state.type}
					options={TYPES}
					property="type"
					label="Box"
					onChange={handlePropertyChange}
				/>
				<RadioButtonView
					value={state.units}
					options={UNITS}
					property="units"
					label="Units"
					onChange={handlePropertyChange}
				/>
				<hr />
				<TextFieldView
					label="Width"
					property="width.length"
					value={state.width.length}
					onChange={handlePropertyChange}
				/>
				<TabTypeView
					label="Tabs"
					property="width.indent"
					type={state.width.indent.type}
					value={state.width.indent.value}
					onChange={handlePropertyChange}
				>
					<TabTypeInfo />
				</TabTypeView>
				<hr />
				<TextFieldView
					label="Height"
					property="height.length"
					value={state.height.length}
					onChange={handlePropertyChange}
				/>
				<TabTypeView
					label="Tabs"
					property="height.indent"
					type={state.height.indent.type}
					value={state.height.indent.value}
					onChange={handlePropertyChange}
				>
					<TabTypeInfo />
				</TabTypeView>
				<hr />
				<TextFieldView
					label="Depth"
					property="depth.length"
					value={state.depth.length}
					onChange={handlePropertyChange}
				/>
				<TabTypeView
					label="Tabs"
					property="depth.indent"
					type={state.depth.indent.type}
					value={state.depth.indent.value}
					onChange={handlePropertyChange}
				>
					<TabTypeInfo />
				</TabTypeView>
				<hr />
				<TextFieldView
					label="Thickness"
					property="thickness"
					value={state.thickness}
					onChange={handlePropertyChange}
				/>
				<TextFieldView label="Kerfing" property="kerfing" value={state.kerfing} onChange={handlePropertyChange}>
					<KerfingInfo />
				</TextFieldView>
				<hr />
				<ButtonView label="Make a box!" onClick={handleSubmit} />
			</fieldset>
		</div>
	)
}

export default Application

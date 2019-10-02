// require 'file?name=main.rb!src/plugin/main.rb'
// require 'file?name=../box-maker.rb!src/plugin/plugin.rb'

import React from "react"
import ReactDOM from "react-dom"
import Application from "./components/application"

ReactDOM.render(<Application />, document.getElementById("root"))

const multiply = (a, b = 2) => {
	return a * b
}

multiply(5, 5)
multiply("test", "woot")

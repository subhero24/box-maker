require 'src/index.html'
require 'file?name=main.rb!src/plugin/main.rb'
require 'file?name=../box-maker.rb!src/plugin/plugin.rb'
require 'lib/bootstrap/css/bootstrap.css'

React = require 'react'
ReactDOM = require 'react-dom'
Application = require './components/application'

window.addEventListener 'load', -> ReactDOM.render <Application />, document.getElementById 'application'

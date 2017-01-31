sketchup = (msg) ->
	window.location.href = "skp:message@#{JSON.stringify(msg)}"

module.exports = sketchup

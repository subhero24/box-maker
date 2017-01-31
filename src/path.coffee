path = (points) ->
	text = ''
	for point in points
		if path is ''
			text += "M#{point.x} #{point.y}"
		else
			text += "L#{point.x} #{point.y}"
	text += 'Z'
	return "<path d=\"#{text}\" />"

module.exports = path

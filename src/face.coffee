edge = require './edge'

face = (dim1, dim2, options, indent1, indent2, start = { x:0, y:0, z:0 }) ->
	corner1 = { x:start.x, y:start.y, z:start.z }
	corner2 = { x:start.x, y:start.y, z:start.z }
	corner2[dim1.dimension] += dim1.length + options.kerfing
	corner2[dim2.dimension] += dim2.length + options.kerfing

	[vertex1, side1..., vertex2] = edge(dim1, dim2, options, indent1, indent2, corner1, no)
	[vertex3, side2..., vertex2] = edge(dim2, dim1, options, indent2, indent1, corner2, yes)
	[vertex3, side3..., vertex4] = edge(dim1, dim2, options, indent1, indent2, corner2, yes)
	[vertex1, side4..., vertex4] = edge(dim2, dim1, options, indent2, indent1, corner1, no)

	points = [vertex1, side1..., vertex2, side2.reverse()..., vertex3, side3..., vertex4, side4.reverse()...]

module.exports = face

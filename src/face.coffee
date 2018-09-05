edge = require './edge'

face = (dim1, dim2, options, indent1, indent2, start = { x:0, y:0, z:0 }) ->
	corner1 = { x:start.x, y:start.y, z:start.z }
	corner2 = { x:start.x, y:start.y, z:start.z }
	corner2[dim1.dimension] += dim1.length + options.kerfing
	corner2[dim2.dimension] += dim2.length + options.kerfing

	[vertex1A, side1..., vertex2A] = edge(dim1, dim2, options, indent1, indent2, corner1, no)
	[vertex3A, side2..., vertex2B] = edge(dim2, dim1, options, indent2, indent1, corner2, yes)
	[vertex3B, side3..., vertex4A] = edge(dim1, dim2, options, indent1, indent2, corner2, yes)
	[vertex1B, side4..., vertex4B] = edge(dim2, dim1, options, indent2, indent1, corner1, no)
	
	# Third vertex has to be taken from either edge 2 or edge 3
	# depending which vertex was the unnotched one in an open box
	vertex = if dim2.dimension is 'z' then vertex3B else vertex3A

	return [vertex1A, side1..., vertex2B, side2.reverse()..., vertex, side3..., vertex4A, side4.reverse()...]

module.exports = face



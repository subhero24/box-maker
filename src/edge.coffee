edge = (dim1, dim2, options, indent1, indent2, start = { x:0, y:0, z:0 }, reverse = no) ->
	points = []
	reverse = if reverse then -1 else 1

	point = { x:start.x, y:start.y, z:start.z }
	point[dim1.dimension] += options.thickness * reverse if indent1
	point[dim2.dimension] += options.thickness * reverse if indent2
	points = [points..., point]

	for n in [1 .. dim1.indent.number - 1]
		point = { x:point.x, y:point.y, z:point.z }
		point[dim1.dimension] = n * dim1.indent.length + dim1.indent.offset
		point[dim1.dimension] += options.kerfing / 2 if (n % 2 is 0) is indent2
		point[dim1.dimension] -= options.kerfing / 2 if (n % 2 is 1) is indent2
		point[dim1.dimension] = start[dim1.dimension] + point[dim1.dimension] * reverse
		points = [points..., point]

		point = { x:point.x, y:point.y, z:point.z }
		point[dim2.dimension] -= options.thickness * reverse if (n % 2 is 1) is indent2
		point[dim2.dimension] += options.thickness * reverse if (n % 2 is 1) isnt indent2
		points = [points..., point]

	point = { x:point.x, y:point.y, z:point.z }
	point[dim1.dimension] = start[dim1.dimension] + (dim1.length + options.kerfing) * reverse
	point[dim1.dimension] -= options.thickness * reverse if indent1
	points = [points..., point]

	return points

module.exports = edge

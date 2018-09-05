face = require './face'

box = (options) ->
	dim1 = options.width
	dim2 = options.depth
	dim3 = options.height
	
	top = face(dim1, dim2, options, no, no, { x:0, y:0, z: options.height?.length + options.kerfing })
	bottom = face(dim1, dim2, options, no, no, { x:0, y: 0, z: 0 })

	back = face(dim3, dim1, options, yes, yes, { x:0, y: options.depth?.length + options.kerfing, z: 0 })
	front = face(dim1, dim3, options, yes, yes, { x:0, y: 0, z: 0 })

	left = face(dim3, dim2, options, yes, no, { x:0, y: 0, z: 0 })
	right = face(dim2, dim3, options, no, yes, { x:options.width?.length + options.kerfing, y: 0, z: 0 })

	return [bottom, front, back, left, right] if options.type is 'open'
	return [top, bottom, front, back, left, right]

module.exports = box

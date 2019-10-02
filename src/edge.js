const edge = (dim1, dim2, options, indent1, indent2, start = { x: 0, y: 0, z: 0 }, reverse = false) => {
	let notched = options.type === 'closed' || dim2.dimension !== 'z' || reverse === false;
	let direction = reverse ? -1 : 1;

	let point = { ...start };
	if (indent1) point[dim1.dimension] += options.thickness * direction;
	if (indent2) point[dim2.dimension] += options.thickness * direction;

	let points = [point];
	if (notched) {
		for (let n = 1; n < dim1.indent.calculated.number; ++n) {
			point = { ...point };
			point[dim1.dimension] = n * dim1.indent.calculated.length + dim1.indent.calculated.offset;
			if ((n % 2 === 0) === indent2) point[dim1.dimension] += options.kerfing / 2;
			if ((n % 2 === 1) === indent2) point[dim1.dimension] -= options.kerfing / 2;
			point[dim1.dimension] = start[dim1.dimension] + point[dim1.dimension] * direction;
			points = [...points, point];

			point = { ...point };
			if ((n % 2 === 1) === indent2) point[dim2.dimension] -= options.thickness * direction;
			if ((n % 2 === 1) !== indent2) point[dim2.dimension] += options.thickness * direction;
			points = [...points, point];
		}
	}

	point = { ...point };
	point[dim1.dimension] = start[dim1.dimension] + (dim1.length + options.kerfing) * direction;
	if (indent1) point[dim1.dimension] -= options.thickness * direction;
	points = [...points, point];

	if (notched) {
		return points;
	} else {
		// If unnotched, heighten the two most outer points and omit the notch points
		// Augment after all calculations are done as they are relative to the position of the previous point
		// and we don't want to influence the position of the center points
		points[0].z = options.height.length;
		points[1].z = options.height.length;
		return points;
	}
};

export default edge;

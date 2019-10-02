import edge from './edge';

let last = array => array[array.length - 1];
let first = array => array[0];
let middle = array => array.slice(1, -1);

const face = (dim1, dim2, options, indent1, indent2, start = { x: 0, y: 0, z: 0 }) => {
	let corner1 = { ...start };
	let corner2 = { ...start };

	corner2[dim1.dimension] += dim1.length + options.kerfing;
	corner2[dim2.dimension] += dim2.length + options.kerfing;

	let edge1A2A = edge(dim1, dim2, options, indent1, indent2, corner1, false);
	let edge3A2B = edge(dim2, dim1, options, indent2, indent1, corner2, true);
	let edge3B4A = edge(dim1, dim2, options, indent1, indent2, corner2, true);
	let edge1B4B = edge(dim2, dim1, options, indent2, indent1, corner1, false);

	let vertex1 = first(edge1A2A);
	let vertex2 = last(edge3A2B);
	let vertex3 = dim2.dimension === 'z' ? first(edge3B4A) : first(edge3A2B);
	let vertex4 = last(edge3B4A);

	let side1 = middle(edge1A2A);
	let side2 = middle(edge3A2B);
	let side3 = middle(edge3B4A);
	let side4 = middle(edge1B4B);

	return [vertex1, ...side1, vertex2, ...side2.reverse(), vertex3, ...side3, vertex4, ...side4.reverse()];
};

export default face;

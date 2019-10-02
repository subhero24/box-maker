import face from './face';

const box = options => {
	let dim1 = options.width;
	let dim2 = options.depth;
	let dim3 = options.height;

	let top = face(dim1, dim2, options, false, false, { x: 0, y: 0, z: options.height.length + options.kerfing });
	let bottom = face(dim1, dim2, options, false, false, { x: 0, y: 0, z: 0 });

	let back = face(dim3, dim1, options, true, true, { x: 0, y: options.depth.length + options.kerfing, z: 0 });
	let front = face(dim1, dim3, options, true, true, { x: 0, y: 0, z: 0 });

	let right = face(dim2, dim3, options, false, true, { x: options.width.length + options.kerfing, y: 0, z: 0 });
	let left = face(dim3, dim2, options, true, false, { x: 0, y: 0, z: 0 });

	if (options.type === 'open') {
		return [bottom, front, back, left, right];
	} else {
		return [top, bottom, front, back, left, right];
	}
};

export default box;

let types = {
	auto: (length, thickness) => {
		let last = {};
		let current = {
			number: 1,
			offset: 0,
			length,
		};

		while (true) {
			for (let key in current) {
				last[key] = current[key];
				current.number = current.number + 2;
				current.length = length / current.number;
				if (current.length < thickness * 2) return last;
				if (current.length <= thickness * 3) return current;
			}
		}
	},
	exact: (length, thickness, value) => {
		let number;
		if (value < thickness * 2) {
			number = Math.ceil((length - 2 * thickness) / value);
			if (number % 2 === 0) {
				number -= 1;
			}
		} else {
			number = Math.ceil(length / value);
			if (number % 2 === 0) {
				number -= 1;
			}
		}

		return { number, length: value, offset: (length - number * value) / 2 };
	},
	approximate: (length, thickness, value) => {
		let last = {};
		let current = {
			number: 1,
			offset: 0,
			length,
			difference: Math.abs(value - length),
		};

		while (true) {
			for (let key in current) {
				last[key] = current[key];
				current.number = current.number + 2;
				current.length = length / current.number;
				current.difference = Math.abs(value - current.length);
				if (current.difference > last.difference || current.length < thickness * 2) {
					delete last.difference;
					return last;
				}
			}
		}
	},
};

let indent = (length, thickness, type = 'auto', value) => {
	if (types[type]) {
		return types[type](length, thickness, value);
	}
};

export default indent;

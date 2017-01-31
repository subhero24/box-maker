types =
	auto: (length, thickness) ->
		last = {}
		current =
			number: 1
			offset: 0
			length: length

		while true
			last[key] = value for key, value of current
			current.number = current.number + 2
			current.length = length / current.number
			return last if current.length < thickness * 2
			return current if current.length <= thickness * 3

	exact: (length, thickness, value) ->
		if value < thickness * 2
			number  = Math.ceil((length - 2 * thickness) / value)
			number -= 1 if number % 2 is 0
		else
			number  = Math.ceil(length / value)
			number -= 1 if number % 2 is 0

		number: number
		length: value
		offset: (length - number * value) / 2

	approximate: (length, thickness, value) ->
		last = {}
		current =
			number: 1
			offset: 0
			length: length
			difference: Math.abs(value - length)

		while true
			last[k] = v for k, v of current
			current.number = current.number + 2
			current.length = length / current.number
			current.difference = Math.abs(value - current.length)
			if current.difference > last.difference or current.length < thickness * 2
				delete last.difference
				return last

module.exports = (length, thickness, type = 'auto', value) -> types[type]?(length, thickness, value)

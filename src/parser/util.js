export function chain(...values) {
	let toF = (x) => typeof x === 'function' ? x : () => x;
	let first = toF(values[0])();
	let c = first instanceof Promise ? first : Promise.resolve(first);
	for (let val of values.slice(1)) {
		c = c.then(toF(val));
	}

	return c;
}

export function join(...values) {
	return Promise.all(values);
}

export function flatten(arr) {
	return arr.reduce((a, b) => a.concat(b), []);
}

export function shuffle(arr){
	let i = arr.length;
	while (i > 0) {
		let j = Math.floor(Math.random() * i);
		let buf = arr[--i];
		arr[i] = arr[j];
		arr[j] = buf;
	}

	return arr;
}
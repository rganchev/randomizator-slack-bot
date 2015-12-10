import List from './list';

export default class IntList extends List {
	constructor(from, to) {
		super();
		[this._from, this._to] = [from, to].map((num) => Number.parseInt(num));
		if (Number.isFinite(this._from)) {
			if (!Number.isFinite(this._to)) {
				this._to = Math.max(this._from, 0);
				this._from = Math.min(this._from, 0);
			}
		} else {
			this._from = this._to = 0;
		}

		this._size = this._to - this._from + 1;
	}

	getSize() {
		return Promise.resolve(this._size);
	}

	get(i) {
		return Promise.resolve(0 <= i && i < this._size ? this._from + i : undefined);
	}

	getAll({ only, without = [] } = {}) {
		let withoutNums = without.map((num) => Number.parseInt(num));
		return Promise.resolve(Object.keys(Array(this._size).fill(0))
			.map((i) => this._from + Number(i))
			.filter((num) => withoutNums.indexOf(num) < 0));
	}

	set(i, value) {
		// this list is immutable
		return Promise.reject();
	}

	insert(i, ...values) {
		// this list is immutable
		return Promise.reject();
	}

	remove(...values) {
		// this list is immutable
		return Promise.reject();
	}
}
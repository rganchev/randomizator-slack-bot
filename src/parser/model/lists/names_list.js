import List from './list';

export default class NamesList extends List {
	constructor(...names) {
		super();
		this._names = names;
	}

	getSize() {
		return Promise.resolve(this._names.length);
	}

	get(i) {
		return Promise.resolve(this._names[i]);
	}

	getAll({ only, without = [] } = {}) {
		// TODO: think of meaningful 'only' filters to use
		return Promise.resolve(this._names.filter((name) => without.indexOf(name) < 0));
	}

	set(i, value) {
		this._names[i] = value;
		return Promise.resolve(this);
	}

	insert(i, ...values) {
		this._names.splice(i, 0, ...values);
		return Promise.resolve(this);
	}

	remove(...values) {
		values.forEach((value) => {
			let i = this._names.indexOf(value);
			if (i >= 0) {
				this._names.splice(i, 1);
			}
		});
		return Promise.resolve();
	}
}
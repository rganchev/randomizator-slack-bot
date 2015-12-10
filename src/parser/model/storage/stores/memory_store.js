import Store from './store';

export default class MemoryStore extends Store {
	constructor() {
		super();
		this._store = {};
	}

	put(name, value) {
		this._store[name] = value;
		return Promise.resolve(value);
	}

	get(name) {
		return Promise.resolve(this._store[name]);
	}

	remove(name) {
		return Promise.resolve(delete this._store[name]);
	}
}
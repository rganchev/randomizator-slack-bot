import Store from './store';

export default class CompositeStore extends Store {
	constructor(...stores) {
		super();
		this._stores = stores;
	}

	get(name) {
		let chain = this._stores[0].get(name);
		this._stores.slice(1).forEach((store) => {
			chain = chain.then((elem) => elem || store.get(name));
		});

		return chain;
	}

	put(name, value) {
		return this._stores[0].put(name, value);
	}

	remove(name) {
		return this._stores[0].remove(name);
	}
}
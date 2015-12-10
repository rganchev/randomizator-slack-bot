import CompositeStore from './stores/composite_store';

export default class NamespacedStorage {
	constructor(StoreCls, rootStorage) {
		this._namespaces = {};
		this._StoreCls = StoreCls;
		this._rootStorage = rootStorage;
	}

	ns(namespace) {
		if (!this._namespaces[namespace]) {
			let nsStore = new this._StoreCls();
			let rootStore = this._rootStorage.ns(namespace);
			this._namespaces[namespace] = new CompositeStore(nsStore, rootStore);
		}

		return this._namespaces[namespace];
	}
}

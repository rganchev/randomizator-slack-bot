import NamespacedStorage from './model/storage/namespaced_storage';
import MemoryStore from './model/storage/stores/memory_store';
import CommandExecutor from './command_executor';

export default class Glist {
	constructor(rootStorage) {
		this._storage = new NamespacedStorage(MemoryStore, rootStorage);
	}

	ns(namespace) {
		return new CommandExecutor(this._storage.ns(namespace));
	}
}
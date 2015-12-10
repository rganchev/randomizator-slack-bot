import Command from './command';
import { chain } from '../../util';

export default class StoreCommand extends Command {
	constructor(name, list) {
		super();
		this._name = name;
		this._list = list;
	}

	exec(store) {
		return store.put(this._name, this._list);
	}

	getName() {
		return 'store';
	}
}
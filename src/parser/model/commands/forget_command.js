import Command from './command';

export default class ForgetCommand extends Command {
	constructor(name) {
		super();
		this._name = name;
	}

	exec(store) {
		return store.remove(this._name);
	}

	getName() {
		return 'forget';
	}
}

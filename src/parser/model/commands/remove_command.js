import Command from './command';

export default class RemoveCommand extends Command {
	constructor(listName, listToRemove) {
		super();
		this._listName = listName;
		this._listToRemove = listToRemove;
	}

	exec(store) {
		return Promise.all([store.get(this._listName), this._listToRemove.getAll()])
			.then(([list, toRemove]) => {
				if (!list) {
					return Promise.reject({ name: this._name });
				}

				return Promise.all(toRemove.map(list.remove.bind(list)));
			});
	}

	getName() {
		return 'remove';
	}
}

import Command from './command';

export default class AddCommand extends Command {
	constructor(listName, listToAdd) {
		super();
		this._listName = listName;
		this._listToAdd = listToAdd;
	}

	exec(store) {
		return Promise.all([store.get(this._listName), this._listToAdd.getAll()])
			.then(([list, toAdd]) => {
				if (!list) {
					return Promise.reject({ name: this._name });
				}

				return list.getSize()
					.then((size) => list.insert(size, ...toAdd));
			});
	}

	getName() {
		return 'add';
	}
}

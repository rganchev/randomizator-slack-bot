import Command from './command';
import { flatten } from '../../util';

export default class ShowCommand extends Command {
	constructor(listDef) {
		super();
		this._listDef = listDef;
	}

	exec(store) {
		let getList = store.get(this._listDef.getListName());
		let getFilterOnly = this._listDef.getFilterOnly().map((list) => list.getAll());
		let getFilterWithout = this._listDef.getFilterWithout().map((list) => list.getAll());
		return Promise.all([getList, Promise.all(getFilterOnly), Promise.all(getFilterWithout)])
			.then(([list, only, without]) => {
				if (!list) {
					return Promise.reject({ name: this._listDef.getListName() });
				}

				return list.getAll({
					only: flatten(only),
					without: flatten(without)
				});
			});
	}

	getName() {
		return 'show';
	}
}

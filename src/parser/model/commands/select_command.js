import Command from './command';
import List from '../lists/list';
import { flatten } from '../../util';

export default class SelectCommand extends Command {
	constructor(listDefOrList) {
		super();
		[this._listDef, this._list] = listDefOrList instanceof List
				? [new NamesListDef('<anonymous>'), listDefOrList]
				: [listDefOrList, null];
	}

	_getList(store) {
		return this._list ? Promise.resolve(this._list)
			: store.get(this._listDef.getListName());
	}

	exec(store) {
		let getList = this._getList(store);
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
				}).then((elems) => elems[Math.floor(Math.random() * elems.length)]);
			});
	}

	getName() {
		return 'select';
	}
}

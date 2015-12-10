export default class NamesListDef {
	constructor(listName) {
		this._listName = listName;
		this._filterOnly = [];
		this._filterWithout = [];
	}

	getListName() {
		return this._listName;
	}

	addFilterOnly(list) {
		this._filterOnly.push(list);
		return this;
	}

	getFilterOnly() {
		return this._filterOnly;
	}

	addFilterWithout(list) {
		this._filterWithout.push(list);
		return this;
	}

	getFilterWithout() {
		return this._filterWithout;
	}
}
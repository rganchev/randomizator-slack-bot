import parser from './glist_parser';

const RESPONSES = {
	default: {
		success: () => 'добре',
		error: () => 'нещо се обърка'
	},

	store: {
		success: (res) => `добре, запомних`,
		error: (res) => `нещо се счупи`
	},

	select: {
		success: (res) => `избрах ${res}`,
		error: (res) => `не знам какво е ${res.name}`
	},

	show: {
		success: (elems) => elems.join(', '),
		error: (res) => `не знам какво е ${res.name}`
	},

	shuffle: {
		success: (elems) => elems.join(', '),
		error: (res) => `не знам какво е ${res.name}`
	}
}

export default class CommandExecutor {
	constructor(store) {
		this._store = store;
	}

	exec(command) {
		let cmdPromise = parser.parse(command);
		let response = null;

		return cmdPromise
			.then((cmd) => {
				let response = RESPONSES[cmd.getName()] || RESPONSES.default;
				return cmd.exec(this._store)
					.then(response.success)
					.catch((err) => {
						return response.error(err);
					});
			});
	}
}
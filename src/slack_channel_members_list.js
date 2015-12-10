import List from './parser/model/lists/list';

const PROP_PREDICATES = [{
	yes: /^актив/,
	no: /^неактив/,
	prop:  'presence',
	yesVal: 'active'
}, {
	yes: /^админ/,
	no: /^неадмин/,
	prop:  'is_аdmin',
	yesVal: true
}, {
	yes: /^(собствени|притежател|владетел)/,
	no: /^не(собствени|притежател|владетел)/,
	prop:  'is_owner',
	yesVal: true
}, {
	yes: /^бот/,
	no: /^небот/,
	prop:  'is_bot',
	yesVal: true
}, {
	yes: /^ограничен/,
	no: /^неограничен/,
	prop:  'is_restricted',
	yesVal: true
}];

function predicateMatches(user, predicate) {
	let matches = PROP_PREDICATES.reduce((propMatches, pp) => {
		return propMatches !== undefined ? propMatches
		: pp.yes.test(predicate) ? user[pp.prop] === pp.yesVal
		: pp.no.test(predicate) ? user[pp.prop] !== pp.yesVal
		: undefined
	}, undefined);

	return matches;
}

function checkUserPredicates(user, predicates) {
	return predicates.reduce(
		(matches, pred) => matches && predicateMatches(user, pred) !== false,
		true);
}

export default class SlackChannelMembersList extends List {

	constructor(slack, channelId) {
		super();
		this._slack = slack;
		this._channel = slack.getChannelByID(channelId);
		if (!this._channel) {
			throw new Error(`Channel with ID "${channelId}" doesn't exist!`); // sublime hack '
		}
	}

	getSize() {
		return Promise.resolve(this._channel.members.length);
	}

	get(i) {
		let member = this._slack.getUserByID(this._channel.members[i]);
		return Promise.resolve(member.name);
	}

	getAll({ only = [], without = [] } = {}) {
		return Promise.resolve(this._channel.members
			.map((id) => this._slack.getUserByID(id))
			.filter((user) => checkUserPredicates(user, only) && without.indexOf(user.name) < 0)
			.map((user) => user.name));
	}

	set(i, value) {
		// Can't modify list of Slack channel members
		return Promise.reject();
	}

	insert(i, ...values) {
		// Can't modify list of Slack channel members
		return Promise.reject();
	}

	remove(...values) {
		// NOOP: can't modify list of Slack channel members
		return Promise.reject();
	}
}

import Slack from 'slack-client'

import { SLACK_TOKEN, AUTO_RECONNECT, AUTO_MARK } from '../slack.config.js';

let slack = new Slack(SLACK_TOKEN, AUTO_RECONNECT, AUTO_MARK);

function onMessage(message, channel) {
	let re = /\brand(?:om)?\W+?(-?\d+)(?:\W+?(-?\d+))?/;
	let matches = re.exec(message);
	if (matches) {
		let [from, to] = matches.slice(1).map((num) => Number.parseInt(num));
		if (Number.isFinite(from)) {
			if (!Number.isFinite(to)) {
				to = Math.max(from, 0);
				from = Math.min(from, 0);
			}

			let random = Math.floor(Math.random() * (to - from + 1) + from);
			channel.send('' + random);
		}
	}

	if (/\brand(om)?\W+?\buser\b/.test(message) && channel.members) {
		let memberId = channel.members[Math.floor(Math.random() * channel.members.length)];
		let member = slack.getUserByID(memberId);
		channel.send(member.name);
	}
}


slack.on('open', () => {
	console.log(`connected to ${slack.team.name} as ${slack.self.name}`);
});

slack.on('message', (message) => {
	let msg = message.text;
	let channel = slack.getChannelGroupOrDMByID(message.channel);
	onMessage(msg, channel);
});

slack.on('error', (err) => {
	console.log(err);
});

slack.login();

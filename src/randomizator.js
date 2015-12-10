import Slack from 'slack-client';

import { SLACK_TOKEN, AUTO_RECONNECT, AUTO_MARK } from '../slack.config.js';

import Glist from './parser/glist';
import SlackChannelsStorage from './slack_channels_storage';

let slack = new Slack(SLACK_TOKEN, AUTO_RECONNECT, AUTO_MARK);
let masterTitle = 'майсторе';
let channelTitles = {};
let glist = new Glist(new SlackChannelsStorage(slack));

function checkAddressing(message, channel) {
	let channelTitle = channelTitles[channel.id];
	let re = new RegExp(`^(${masterTitle + (channelTitle ? '|' + channelTitle : '')}),? (.+)`);
	let matches = re.exec(message);
	let response = null;
	if (matches) {
		let messageTitle = matches[1];
		let command = matches[2];

		if (channelTitle && messageTitle === masterTitle) {
			response = `нали щеше да ми викаш "${channelTitle}"`;
		} else {
			let changeTitleMatches = /ще ти викаме? ([абвгдежзийклмнопрстуфхцчшщъьюяАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЮЯ\w\d\s]+)/.exec(command);
			if (changeTitleMatches) {
				let newTitle = changeTitleMatches[1].trim();
				console.log(newTitle);
				if (newTitle === masterTitle) {
					delete channelTitles[channel.id];
					response = 'добре';
				} else if (newTitle) {
					channelTitles[channel.id] = newTitle;
					response = `добре, вече отговарям на "${newTitle}"`;
				} else {
					response = 'я пак?';
				}
			}
		}

		if (response) {
			channel.send(response);
		} else {
			return command;
		}
	}

	return null;
}

function onMessage(message, channel) {
	let command = checkAddressing(message, channel);
	if (command) {
		console.log(message);
		let respond = (res) => {
			console.log(res);
			channel.send(res);
		};

		let exec;
		try {
			exec = glist.ns(channel.id).exec(command);
		} catch (e) {
			console.error(e);
			exec = Promise.reject('не разбирам');
		}
		
		exec.then(respond).catch(respond);
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

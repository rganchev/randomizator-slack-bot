import SlackChannelStore from './slack_channel_store';

export default class SlackChannelsStorage {
	constructor(slack) {
		this._channelStores = {};
		this._slack = slack;
	}

	ns(channelId) {
		if (!this._channelStores[channelId]) {
			this._channelStores[channelId] = new SlackChannelStore(this._slack, channelId);
		}

		return this._channelStores[channelId];
	}
}

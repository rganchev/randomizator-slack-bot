import Store from './parser/model/storage/stores/store';
import MemoryStore from './parser/model/storage/stores/memory_store';
import SlackChannelMembersList from './slack_channel_members_list';

export default class SlackChannelMembersStore extends MemoryStore {
	constructor(slack, channelId) {
		super();
		try {
			this.put('канала', new SlackChannelMembersList(slack, channelId));
		} catch (e) {
			console.warn(e);
		}
	}
}
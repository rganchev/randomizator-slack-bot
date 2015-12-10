import Glist from '../glist';
import chai from 'chai';

chai.should();
let expect = chai.expect;
let glist = new Glist();

describe('glist tests', () => {

	it('should execute commands', () => {
		glist.exec('запомни радо, пап, жоро като девс')
			.then((response) => {
				console.log('RESPONSE: ', response);
				return glist.exec('избери от девс')
			})
			.then(console.log)
			.catch(console.log)
	});

});
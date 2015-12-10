import NamesList from '../parser/model/names_list.js';
import chai from 'chai';

let should = chai.should();

describe('names list tests', () => {

	it('should create lists correctly', (done) => {
		let list = new NamesList('pencho', 'stancho', 'mancho');
		list.getSize().then((size) => {
			size.should.equal(3);
			done();
		}).catch(done);
	});

});
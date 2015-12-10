import glist from '../parser/glist_parser';
import scope from '../parser/scope';
import chai from 'chai';

chai.should();
let expect = chai.expect;

describe('glist parser tests', () => {

	it('should parse select statements', () => {
		expect(() => glist.parse('дай от девс')).to.not.throw();
		expect(() => glist.parse('дай ми един от девс')).to.not.throw();

		expect(() => glist.parse('дай от')).to.throw();
		expect(() => glist.parse('дай от девс един')).to.throw();
	});

	it('should parse store statements', (done) => {
		expect(() => {
			let result = glist.parse('запази 1, 2, 3 като числа');
			result.then((command) => {
				expect(command).to.be.an.instanceof(scope.StoreCommand);
				done();
			});
		}).to.not.throw();
	});

});
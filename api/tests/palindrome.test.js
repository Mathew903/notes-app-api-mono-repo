const { palindrome } = require('../utils/for_testing');

test.skip('test to search palindrome', () => {
	expect(palindrome('mati')).toBe('itam');
});

test.skip('palindrome of empty string', () => {
	expect(palindrome('')).toBe('');
});

test.skip('palindrome of undefined', () => {
	expect(palindrome()).toBeUndefined();
});

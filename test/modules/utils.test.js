import test from 'ava'
import { toUrl, truncate, getUnique, deepExtend, escapeRegExp, createText } from '../../src/js/modules/utils.js'

test('toUrl() method', t => {
    const actual = toUrl('github.com');
    const expected = '//github.com';
    t.ok(actual === expected);

    const actual2 = toUrl('//github.com');
    t.ok(actual2 === expected)
});

test('trucate() method', t => {
    const actual = truncate('Est fidelis fuga', 10);
    const expected = 'Est fidel...';
    t.ok(actual === expected);

    const actual2 = truncate('Est', 10);
    const expected2 = 'Est';
    t.ok(actual2 === expected2)
});

test('getUnique() method', t => {
    const actual = getUnique([1, 3, 'a', 'a', 1, 5]);
    const expected = [1, 3, 'a', 5];
    t.same(actual, expected)
	
    const actual2 = getUnique(['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']);
    const expected2 = ['b'];
    t.same(actual2 == expected2)
	
    const actual3 = getUnique([]);
    const expected3 = [];
    t.same(actual3 == expected3)
	
    const actual4 = getUnique(['abac', 'abab', 'aaaa', 'abab', 'a', 'ab', 'ba', 'aaa', 'aaaa', 'abac', 'ba', 'ba']);
    const expected4 = ['abac', 'abab', 'aaaa', 'a', 'ab', 'ba', 'aaa'];
    t.same(actual4 == expected4)
	
    const actual5 = getUnique(['a', 'b', 'c', 'd', 1, 2, 3, 4]);
    const expected5 = ['a', 'b', 'c', 'd', 1, 2, 3, 4];
    t.same(actual5 == expected5)
});

test('deepExtend() method', t => {
    const defaults = {
        a: 1,
        b: 'hello',
        c: {
            d: 2,
            e: true
        }
    };

    const opts = {
        a: 3,
        c: {
            e: false
        }
    };

    const expected = {
        a: 3,
        b: 'hello',
        c: {
            d: 2,
            e: false
        }
    };

    const actual = deepExtend(defaults, opts);
    t.same(actual, expected)
});

test('escapeRegExp() method', t => {
    const expected = ':):/';
    const reg = new RegExp(escapeRegExp(expected), 'g');
    t.ok(expected.match(reg))
});

test('createText() method',t => {
		const str = 'This is embed.js';
		const embeds = [{
			index: 3,
			text: 'foo'
		}, {
			index: 1,
			text: 'bar'
		}, {
			index: 2,
			text: 'john'
		}];

		const actual = createText(str, embeds);
		const expected = 'This is embed.js bar john foo';

		t.same(actual, expected)
});

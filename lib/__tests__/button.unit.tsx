import Button from '../button';
import renderer from 'react-test-renderer';
import * as React from 'react';
import classes from '../helpers/classes';

describe('button', function () {
    it('是个div', function () {
        const json = renderer.create(<Button/>).toJSON();
        expect(json).toMatchSnapshot();
    });
    it('接受2个className', () => {
        const result = classes('a', 'b');
        expect(result).toEqual('a b');
    });
    it('undefined', () => {
        const result = classes('a', undefined);
        expect(result).toEqual('a');
    })
});

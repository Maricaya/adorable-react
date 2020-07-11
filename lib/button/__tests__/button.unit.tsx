import Button from '../button';
import renderer from 'react-test-renderer';
import * as React from 'react';

describe('button', function () {
    it('是个div', function () {
        const json = renderer.create(<Button/>).toJSON();
        expect(json).toMatchSnapshot();
    });

});

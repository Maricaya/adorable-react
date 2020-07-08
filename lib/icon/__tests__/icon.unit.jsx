import * as renderer from 'react-test-renderer';
import * as React from 'react';
import Icon from "../icon"
import {mount} from 'enzyme';

describe('Icon', function () {
  it('render successfully', function () {
    const json = renderer.create(<Icon name="wechat"/>).toJSON();
    expect(json).toMatchSnapshot();
  });
  it('onClick', function () {
    const fn = jest.fn()
    const component = mount(<Icon name="wechat" onClick={fn}/>)
    component.find('svg').simulate('click');
    expect(fn).toBeCalled();
  });
});

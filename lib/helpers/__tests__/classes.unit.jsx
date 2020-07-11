import {classes, scopedClassMaker} from '../classes'

describe('classes', function () {
  it('接受 0 个 className', () => {
    const result = classes();
    expect(result).toEqual('');
  })
  it('接受一个 className', function () {
    const result = classes('a');
    expect(result).toEqual('a');
  });
  it('接受 2 个 className', () => {
    const result = classes('a', 'b');
    expect(result).toEqual('a b');
  });
  it('undefined', () => {
    const result = classes('a', undefined);
    expect(result).toEqual('a');
  })
  it('接受各种奇怪值', () => {
    const result = classes('a', '中文', null, false, undefined);
    expect(result).toEqual('a 中文');
  })
});
describe('scopedClassMaker', function () {
  it('接受字符串或对象', () => {
    const sc = scopedClassMaker('xue-layout');
    expect(sc('')).toEqual('xue-layout')
    expect(sc('x')).toEqual('xue-layout-x')
    expect(sc({y: true, z: false})).toEqual('xue-layout-y')
    expect(sc({y: true, z: true})).toEqual('xue-layout-y xue-layout-z')
    expect(sc({y: true, z: true}, {extra: 'red'})).toEqual('xue-layout-y xue-layout-z red')

  })
});

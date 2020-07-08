import classes from '../classes'

describe('classes', function () {
  it('接受一个 className', function () {
    const result = classes('a');
    expect(result).toEqual('a');
  });
});

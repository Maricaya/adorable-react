type Options = {
  extra: string | undefined
}

type classToggles = {
  [K: string]: Boolean
}
const scopedClassMaker = (prefix: string) => {
  return function scopedClass(name?: string | classToggles, options?: Options) {
    // name = {hasAside: true, active: false, x: true, y: false}
    let name2;
    let result;
    if (typeof name === 'string' || typeof name === 'undefined') {
      name2 = name;
      result =  [prefix, name2].filter(Boolean).join('-');
    } else {
      name2 = Object.entries(name).filter(kv => kv[1]).map(kv => kv[0]);
      //  ['hasAside', 'x']
      result = name2.map(n =>
        [prefix, n].filter(Boolean).join('-')
      ).join(' ')
    }
    if (options && options.extra) {
      return [result, options && options.extra].filter(Boolean).join(' ');
    } else {
      return result;
    }
  };
};

export {scopedClassMaker};

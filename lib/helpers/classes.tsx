function classes(...names: (string | undefined)[]) {
  return names.filter(Boolean).join(' ');
}

type Options = {
  extra: string | undefined
}

type classToggles = {
  [K: string]: Boolean
}
const scopedClassMaker = (prefix: string) => {
  return (name: string | classToggles, options?: Options) => {
    return Object
      .entries((typeof name === 'string') ? {[name]: name} : name)
      .filter(kv => kv[1] !== false)
      .map(kv => kv[0])
      .map(name => [prefix, name]
        .filter(Boolean)
        .join('-'))
      .concat(options && options.extra || [])
      .join(' ');
  };
};

export {scopedClassMaker, classes};
export function getProviders<T = object>(module: T) {
  return Object.entries(module)
    .filter(([k, v]) => !k.includes('use'))
    .reduce((acc, [k, v]) => {
      // @ts-ignore
      acc[k] = v;
      return acc;
    }, {});
}

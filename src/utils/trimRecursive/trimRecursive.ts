const trimRecursive = <T = any>(valueOrObj: T) => {
  if (Array.isArray(valueOrObj)) {
    return valueOrObj.map(item => trimRecursive(item));
  }

  if (
    typeof valueOrObj === 'undefined' 
      || typeof valueOrObj === 'function'
      || valueOrObj === null
  ) {
    return valueOrObj;
  }

  if (typeof valueOrObj === 'object') {
    return Object.entries(valueOrObj).reduce((result, [key, value]) => {
      return {
        ...result,
        [key]: trimRecursive(value),
      };
    }, {} as T);
  }

  if (typeof valueOrObj === 'string') {
    return valueOrObj.trim();
  }

  return valueOrObj;
};

export default trimRecursive;

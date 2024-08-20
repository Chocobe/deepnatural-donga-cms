const excludeNullOrUndefinedProperties = <T extends object>(obj: T) => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (value === null || typeof value === 'undefined') {
      return result;
    }

    result[key] = typeof value === 'object'
      ? excludeNullOrUndefinedProperties(value)
      : value;

    return result;
  }, {} as T);
};

export default excludeNullOrUndefinedProperties;

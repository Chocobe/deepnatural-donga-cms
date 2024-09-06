const excludeNullOrUndefinedProperties = <T extends object>(obj: T) => {
  if (typeof obj !== 'object') {
    return obj;
  }

  return Object.entries(obj).reduce((result, [key, value]) => {
    if (value === null || typeof value === 'undefined') {
      return result;
    }

    if (Array.isArray(value)) {
      result[key] = value.map(valueItem => excludeNullOrUndefinedProperties(valueItem));
      return result;
    }

    result[key] = typeof value === 'object'
      ? excludeNullOrUndefinedProperties(value)
      : value;

    return result;
  }, {} as T);
};

export default excludeNullOrUndefinedProperties;

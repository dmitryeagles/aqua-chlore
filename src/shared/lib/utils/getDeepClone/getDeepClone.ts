export function getDeepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (obj instanceof Array) {
    return obj.map((item) => getDeepClone(item)) as any;
  }

  if (obj instanceof Map) {
    const mapCopy = new Map();

    for (const [key, value] of obj) {
      mapCopy.set(key, getDeepClone(value));
    }

    return mapCopy as any;
  }

  if (obj instanceof Set) {
    const setCopy = new Set();

    for (const value of obj) {
      setCopy.add(getDeepClone(value));
    }

    return setCopy as any;
  }

  const objCopy = {} as { [key: string]: any };

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      objCopy[key] = getDeepClone((obj as any)[key]);
    }
  }

  return objCopy as T;
}

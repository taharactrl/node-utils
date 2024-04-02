const ERROR = require("./error.json");

const isObject = (x) => typeof x === "object";

const subtractJson = (a, b) => {
  return Object.keys(a).reduce((acc, key) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA === valueB) return acc;

    if (isObject(valueA) && isObject(valueB)) {
      return acc.concat(subtractJson(valueA, valueB).map((x) => `${key}.${x}`));
    }

    return acc.concat(key);
  }, []);
};

const differenceJSON = (a, b) => {
  return uniqArray([...subtractJson(a, b), ...subtractJson(b, a)]);
};

const includeJSON = (a, b) => {
  return subtractJson(b, a).length === 0;
};

const equalJSON = (a, b) => {
  return differenceJSON(a, b).length === 0;
};

const cloneJSON = (json) => {
  return { ...json };
};

const uniqArray = (array) => {
  return [...new Set(array)];
};

const detectRecursiveObject = (obj) => {
  let list = [obj];
  let recursiveObjectPathList = [];

  const _detectRecursive = (obj, basePath = "") => {
    for (let key in obj) {
      if (list.includes(obj[key])) {
        recursiveObjectPathList.push(basePath ? basePath + "." + key : key);
      } else {
        _detectRecursive(obj[key], basePath ? basePath + "." + key : key);
      }
    }
  };

  _detectRecursive(obj);

  return recursiveObjectPathList;
};

const objectFromJSONPath = (obj, path) => {
  if (typeof obj != "object") {
    throw new Error(ERROR.NOT_OBJECT.replace(/%s/, obj));
  }

  if (typeof path != "string") {
    throw new Error(ERROR.NOT_STRING.replace(/%s/, path));
  }

  let ret = obj;
  for (let subPath of path.split(".")) {
    ret = ret?.[subPath];
  }

  return ret;
};

const mergeObjects = (baseObject, additionalObject) => {
  baseObject = { ...baseObject, ...additionalObject };
  return baseObject;
};

module.exports = {
  uniqArray,
  subtractJson,
  differenceJSON,
  detectRecursiveObject,
  includeJSON,
  equalJSON,
  cloneJSON,
  objectFromJSONPath,
  mergeObjects,
};

const subtractJson = (a, b) => {
  let mismatchList = [];

  for (let keyA in a) {
    if (a[keyA] === b[keyA]) {
      continue;
    }

    if (typeof a[keyA] === "object" && typeof b[keyA] === "object") {
      mismatchList = mismatchList.concat(
        subtractJson(a[keyA], b[keyA]).map((x) => {
          return `${keyA}.${x}`;
        })
      );
    } else {
      mismatchList.push(keyA);
    }
  }

  return mismatchList;
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

module.exports = {
  uniqArray,
  subtractJson,
  differenceJSON,
  detectRecursiveObject,
  includeJSON,
  equalJSON,
  cloneJSON,
};

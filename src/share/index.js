import _ from "lodash-es";
import validator from "validator";

/**
 * 将路径字符串转换为帕斯卡命名法（PascalCase）
 */
export const toPascalCase = (path) => {
  if (!path || validator.isURL(path)) {
    return "";
  }
  return _.upperFirst(_.camelCase(path));
};

/**
 * 判断一个值是否为空值。
 */
export const isBlank = (value) => {
  if (_.isFinite(value) || _.isBoolean(value)) return false;
  
  if (_.isString(value)) return _.trim(value).length === 0;
  
  return _.isEmpty(value);
};

/**
 * 判断一个值是否不是空值。
 */
export const isNotBlank = value => !isBlank(value);

/**
 * 判断一个值是否为原始类型（Primitive）。
 */
export const isPrimitive = (value) => {
  return value === null || (typeof value !== "object" && typeof value !== "function");
};

/**
 * 深度清理对象或数组中所有空值字段。
 */
export const cleanObject = (obj) => {
  if (isPrimitive(obj)) {
    return obj;
  }
  
  if (_.isArray(obj)) {
    return obj.map(cleanObject).filter(isNotBlank);
  }
  
  const cleaned = _.pickBy(obj, isNotBlank);
  for (let [key, value] of Object.entries(cleaned)) {
    cleaned[key] = cleanObject(value);
  }
  
  return cleaned;
};

/**
 * 构造树形结构
 */
export const buildTree = (list, rootId = 0) => {
  return list.filter(item => item.pid === rootId).map(item => {
    const children = buildTree(list, item.id);
    if (children.length) {
      item.children = children;
    }
    return item;
  });
};

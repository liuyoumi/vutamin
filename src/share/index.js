import _ from "lodash-es";
import validator from "validator";

/**
 * 将路径字符串转换为帕斯卡命名法（PascalCase）
 *
 * @param {string} path - 需要转换的路径字符串（支持 / 或 - 分隔）
 * @returns {string} 转换后的帕斯卡命名法字符串，如果输入无效则返回空字符串
 */
export const toPascalCase = (path) => {
  if (!path || validator.isURL(path)) {
    return "";
  }
  return _.upperFirst(_.camelCase(path));
};

/**
 * 判断一个值是否为空值。
 * 空值包括：null、undefined、NaN、空字符串、空数组、空对象。
 *
 * @param {*} value - 要判断的值
 * @returns {boolean} 如果是空值，返回 true；否则返回 false
 */
export const isBlank = (value) => {
  if (_.isFinite(value) || _.isBoolean(value)) return false;
  
  if (_.isString(value)) return _.trim(value).length === 0;
  
  return _.isEmpty(value);
};

/**
 * 判断一个值是否不是空值。
 *
 * @param {*} value
 * @return {boolean}
 */
export const isNotBlank = value => !isBlank(value);

/**
 * 判断一个值是否为原始类型（Primitive）。
 * 包括：string、number、boolean、symbol、bigint、undefined、null。
 *
 * @param {*} value - 要判断的值
 * @returns {boolean} 如果是原始类型，返回 true；否则返回 false
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
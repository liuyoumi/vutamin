import validator from "validator";
import {camelCase, upperFirst} from "lodash-es";

/**
 * 将路径字符串转换为帕斯卡命名法（PascalCase）
 * @example
 * toPascalCase('/user/profile'); // 返回 "UserProfile"
 * toPascalCase('hello-world');  // 返回 "HelloWorld"
 *
 * @param {string} path - 需要转换的路径字符串（支持 / 或 - 分隔）
 * @returns {string} 转换后的帕斯卡命名法字符串，如果输入无效则返回空字符串
 *
 * @throws {TypeError} 当输入不是字符串时抛出异常
 */
export const toPascalCase = (path) => {
  if (!path || validator.isURL(path)) {
    return "";
  }
  return upperFirst(camelCase(path));
};
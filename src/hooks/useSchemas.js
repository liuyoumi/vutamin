import {isObject} from "lodash-es";
import {DictTag} from "@/components/DictTag/index.js";
import {useStorage} from "@vueuse/core";

export const useSchemas = (schemas, cacheKey) => {
  const fields = useStorage(cacheKey, schemas.map(item => item.key));
  const columns = computed(() => {
    return fields.value.map(key => {
      const schema = schemas.find(item => item.key === key);
      
      const column = {
        colKey: key,
        title: schema.title,
        ...(isObject(schema.table) ? schema.table : {}),
      };
      
      if (schema.dictType) {
        column.cell = (h, {row}) => {
          return h(DictTag, {value: row[key], type: schema.dictType});
        };
      }
      return column;
    });
  });
  
  const searchSchemas = extractSearchSchemas(schemas);
  
  return {
    fields,
    columns,
    searchSchemas,
  };
};

/**
 * 提取表格列
 */
// const extractColumns = (schemas, fields) => {
//   return fields.value.map(key => {
//     const schema = schemas.find(schema => schema.key === key);
//     const column = {
//       colKey: key,
//       title: schema.title,
//       ...(isObject(schema.table) ? schema.table : {}),
//     };
//
//     if (schema.dictType) {
//       column.cell = (h, {row}) => {
//         return h(DictTag, {value: row[key], type: schema.dictType});
//       };
//
//       return column;
//     }
//   });
// };

/**
 * 提取搜索表单
 * @type {Map<string[], function(*): string>}
 */
const placeholderGenerators = new Map([
  [["Input"], (label) => `请输入${label}`],
  [["Select", "DictSelect"], (label) => `${label}: 请选择`],
]);

const extractSearchSchemas = (schemas) => {
  return schemas.filter(schema => {
    return schema.search || isObject(schema.search);
  }).map(schema => {
    let {
      component = "Input",
      componentProps = {},
    } = schema.search;
    
    if (schema.dictType) {
      component = "DictSelect";
      componentProps.dictType = schema.dictType;
    }
    
    let placeholder;
    for (const [components, generate] of placeholderGenerators) {
      if (components.includes(component)) {
        placeholder = generate(schema.title);
        break;
      }
    }
    
    if (placeholder) {
      componentProps.placeholder = placeholder;
    }
    
    return {
      ...schema.search,
      key: schema.key,
      title: schema.title,
      component,
      componentProps,
    };
  });
};

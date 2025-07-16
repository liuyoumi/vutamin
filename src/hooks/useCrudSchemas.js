import {isFunction, isObject} from "lodash-es";
import {DictTag} from "@/components/DictTag/index.js";
import {useStorage} from "@vueuse/core";
import {getDictOptions} from "@/share/dict.js";
import {DateRangePicker, Input, Select} from "tdesign-vue-next";

export const useCrudSchemas = (schemas, cacheKey) => {
  const fields = useStorage(cacheKey, schemas.map(item => item.field));
  const columns = computed(() => {
    return fields.value.map(key => {
      const schema = schemas.find(item => item.field === key);
      
      const column = {
        colKey: key,
        title: schema.label,
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
  
  const searchSchema = extractSearchSchema(schemas);
  
  return {
    fields,
    columns,
    searchSchema,
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
const componentMap = {
  Input,
  Select,
  DateRangePicker,
};

const placeholderGenerators = new Map([
  [["Input"], (label) => `请输入${label}`],
  [["Select"], (label) => `请选择`],
]);

const extractSearchSchema = (schemas) => {
  return schemas.filter(schema => schema.search)
  .map(schema => {
    let {
      cell,
      component = "Input",
      componentProps = {},
    } = schema.search;
    
    if (isFunction(cell)) {
      return {
        ...schema.search,
        label: schema.label,
        field: schema.field,
      };
    }
    
    if (schema.dictType) {
      component = "Select";
      componentProps.label = schema.label + "：";
      componentProps.options = getDictOptions(schema.dictType);
      componentProps.clearable = true;
    }
    
    let placeholder;
    for (const [components, generate] of placeholderGenerators) {
      if (components.includes(component)) {
        placeholder = generate(schema.label);
        break;
      }
    }
    
    if (placeholder) {
      componentProps.placeholder = placeholder;
    }
    
    cell = h => h(componentMap[component], componentProps);
    
    return {
      ...schema.search,
      label: schema.label,
      field: schema.field,
      cell,
    };
  });
};

import {useDictStore} from "@/store/modules/dict.js";

const dictStore = useDictStore();

export const DICT_TYPE = {
  TOGGLE_TYPE: "toggle_type",
  COMMON_BOOL: "common_bool",
  COMMON_STATUS: "common_status",
  SYSTEM_MENU_TYPE: "system_menu_type",
};

export function getDictOptions(dictType, valueType = "str") {
  if (!dictType) return [];
  
  const options = dictStore.dictMap[dictType] || [];
  
  const valueConverters = {
    str: (value) => value,
    number: (value) => Number(value),
    boolean: (value) => value === "true",
  };
  
  const convertValue = valueConverters[valueType] || valueConverters.str;
  
  return options.map(option => ({
    ...option,
    value: convertValue(option.value),
  }));
}

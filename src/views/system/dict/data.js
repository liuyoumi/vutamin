import {DICT_TYPE} from "@/share/dict.js";

export const schemas = [
  {
    label: "编号",
    field: "id",
    table: {
      fixed: "left",
    },
  },
  {
    label: "字典名称",
    field: "name",
    table: {
      fixed: "left",
    },
    search: true,
  },
  {
    label: "字典类型",
    field: "type",
    search: true,
  },
  {
    label: "状态",
    field: "status",
    search: true,
    dictType: DICT_TYPE.COMMON_STATUS,
  },
  {
    label: "创建时间",
    field: "createdAt",
  },
  {
    label: "操作",
    field: "operation",
    table: {
      fixed: "right",
    },
  },
];

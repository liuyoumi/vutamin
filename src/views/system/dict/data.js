import {DICT_TYPE} from "@/share/dict.js";

export const schemas = [
  {
    key: "id",
    title: "编号",
    table: {
      fixed: "left",
    },
  },
  {
    key: "name",
    title: "字典名称",
    table: {
      fixed: "left",
    },
    search: true,
  },
  {
    key: "type",
    title: "字典类型",
    search: true,
  },
  {
    key: "status",
    title: "状态",
    search: true,
    dictType: DICT_TYPE.COMMON_STATUS,
  },
  {
    key: "createdAt",
    title: "创建时间",
  },
  {
    key: "operation",
    title: "操作",
    table: {
      fixed: "right",
    },
  },
];

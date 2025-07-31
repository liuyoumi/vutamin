import {DICT_TYPE} from "@/share/dict.js";

export const schemas = [
  {
    label: "序号",
    field: "serial-number",
  },
  {
    label: "角色名称",
    field: "name",
    search: true,
  },
  {
    label: "角色类型",
    field: "type",
    dictType: DICT_TYPE.SYSTEM_ROLE_TYPE,
  },
  {
    label: "角色编码",
    field: "code",
    search: true,
  },
  {
    label: "备注",
    field: "remark",
    table: {
      width: 200,
    },
  },
  {
    label: "状态",
    field: "status",
    search: true,
    table: {
      align: "center",
    },
    dictType: DICT_TYPE.COMMON_STATUS,
  },
  {
    label: "创建时间",
    field: "createdAt",
    table: {
      width: 180,
    },
    format: "YYYY-MM-DD HH:mm:ss",
  },
  {
    label: "操作",
    field: "operation",
    table: {
      width: 200,
      fixed: "right",
    },
  },
];

import {DICT_TYPE} from "@/share/dict.js";
import {Icon} from "tdesign-vue-next";

export const schemas = [
  {
    label: "菜单名称",
    field: "name",
    table: {
      fixed: "left",
    },
    search: true,
  },
  {
    label: "菜单类型",
    field: "type",
    dictType: DICT_TYPE.SYSTEM_MENU_TYPE,
  },
  {
    label: "菜单图标",
    field: "icon",
    table: {
      cell: (h, {row}) => {
        return h(Icon, {name: row.icon});
      },
    },
  },
  {
    label: "路由地址",
    field: "path",
  },
  {
    label: "排序",
    field: "sort",
  },
  {
    label: "权限标识",
    field: "permission",
  },
  {
    label: "组件路径",
    field: "component",
  },
  {
    label: "是否可见",
    field: "visible",
    dictType: DICT_TYPE.COMMON_BOOL,
  },
  {
    label: "独立布局",
    field: "single",
    dictType: DICT_TYPE.COMMON_BOOL,
  },
  {
    label: "缓存状态",
    field: "keepAlive",
    dictType: DICT_TYPE.COMMON_STATUS,
  },
  {
    label: "菜单状态",
    field: "status",
    search: true,
    dictType: DICT_TYPE.COMMON_STATUS,
  },
  {
    label: "操作",
    field: "operation",
    table: {
      width: 200,
      fixed: "right",
    },
    form: false,
    detail: false,
  },
];

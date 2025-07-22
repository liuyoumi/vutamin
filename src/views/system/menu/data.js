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
  },
  {
    label: "菜单图标",
    field: "icon",
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
    label: "基础布局",
    field: "layout",
  },
  {
    label: "是否可见",
    field: "visible",
  },
  {
    label: "外部链接",
    field: "external",
  },
  {
    label: "缓存状态",
    field: "keepAlive",
  },
  {
    label: "菜单状态",
    field: "status",
    search: true,
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

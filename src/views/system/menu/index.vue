<script setup>
import {schemas} from "./data.js";
import {createCrudContext, Search, Table, Toolbar} from "@/components/CrudContext/index.js";
import {MenuApi} from "@/api/system/menu/index.js";
import {buildTree} from "@/share/index.js";
import {IconButton} from "@/components/IconButton/index.js";
import MenuForm from "@/views/system/menu/MenuForm.vue";

const {
  cruder,
  CrudContextProvider,
} = createCrudContext({
  id: "system_menu",
  schemas,
  pagination: false,
  getListApi: async (params) => {
    const data = await MenuApi.getList(params);
    return buildTree(data);
  },
});

const tableRef = ref();
const treeConfig = {
  expandTreeNodeOnClick: false,
};

const expandAll = ref(false);
const onRowToggle = () => {
  if (expandAll.value) {
    tableRef.value.foldAll();
  } else {
    tableRef.value.expandAll();
  }
  expandAll.value = !expandAll.value;
};

const formRef = ref();
const openForm = (...args) => {
  formRef.value.open(...args);
};
</script>

<template>
  <CrudContextProvider>
    <Search @search="cruder.search"/>
    <Toolbar>
      <t-space>
        <IconButton icon="add" @click="openForm('create')">
          新增菜单
        </IconButton>
        <IconButton icon="arrow-up-down-1" theme="warning" @click="onRowToggle">
          展开/折叠
        </IconButton>
        <IconButton icon="refresh" theme="default">
          刷新菜单缓存
        </IconButton>
      </t-space>
    </Toolbar>
    <Table size="small" mode="enhanced" :tree="treeConfig" :register="e => tableRef = e">
      <template #operation>
        <t-button size="small" theme="primary" variant="text">修改</t-button>
        <t-button size="small" theme="primary" variant="text">新增</t-button>
        <t-button size="small" theme="danger" variant="text">删除</t-button>
      </template>
    </Table>
    <MenuForm ref="formRef" @success="cruder.getList"/>
  </CrudContextProvider>
</template>

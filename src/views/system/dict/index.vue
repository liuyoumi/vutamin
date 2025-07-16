<script setup>
import {schemas} from "./data.js";
import {IconButton} from "@/components/IconButton";
import {createCrudContext, Search, Toolbar} from "@/components/CrudContext/index.js";
import {SystemDictTypeApi} from "@/api/system/dict.js";

const {
  cruder,
  CrudContextProvider,
} = createCrudContext({
  id: "system_dict",
  schemas,
  immediate: true,
  getListApi: SystemDictTypeApi.getList,
});
</script>

<template>
  <CrudContextProvider>
    <Search @search="cruder.search"/>
    <Toolbar>
      <IconButton icon="add">
        新增字典
      </IconButton>
    </Toolbar>
    <Table size="small">
      <template #operation>
        <t-button size="small" variant="text" theme="primary">编辑</t-button>
        <t-button size="small" variant="text" theme="primary">数据</t-button>
        <t-button size="small" variant="text" theme="danger">删除</t-button>
      </template>
    </Table>
  </CrudContextProvider>
</template>

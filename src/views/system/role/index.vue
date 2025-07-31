<script setup>
import {schemas} from "./data.js";
import {RoleApi} from "@/api/system/role/index.js";
import {IconButton} from "@/components/IconButton";
import {createCrudContext, Search, Table, Toolbar} from "@/components/CrudContext/index.js";
import RoleForm from "@/views/system/role/components/RoleForm.vue";
import PermsModal from "@/views/system/role/components/PermsModal.vue";

const {cruder, CrudContextProvider} = createCrudContext({
  id: "system_role",
  schemas,
  getListApi: RoleApi.getList,
  delListApi: RoleApi.remove,
});

const formRef = ref();
const openForm = (...args) => {
  formRef.value.open(...args);
};
const permsRef = ref();
</script>

<template>
  <CrudContextProvider>
    <Search @search="cruder.search"/>
    <Toolbar>
      <IconButton icon="add" @click="openForm('create')">新建角色</IconButton>
    </Toolbar>
    <Table size="small">
      <template #operation="{row}">
        <t-button size="small" variant="text" theme="primary" @click="openForm('update', row.id)">编辑</t-button>
        <t-button size="small" variant="text" theme="primary" @click="() => permsRef.open(row)">分配权限</t-button>
        <t-button size="small" variant="text" theme="danger" @click="cruder.delList(row.id)">删除</t-button>
      </template>
    </Table>
    <RoleForm ref="formRef"/>
    <PermsModal ref="permsRef"/>
  </CrudContextProvider>
</template>

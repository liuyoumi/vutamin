<script setup>
import {buildTree} from "@/share/index.js";
import {useUserStore} from "@/store/modules/user.js";

const visible = ref(false);
const open = async (data) => {
  visible.value = true;
  checkAll.value = false;
  expandAll.value = false;
  role.value = data;
};
defineExpose({open});

const role = ref({});
const userStore = useUserStore();
const menuTree = buildTree(userStore.menus);

const treeRef = ref();
const checkAll = ref(false);
const expandAll = ref(false);

const onCheckAll = (value) => {
  console.log(value);
};
</script>

<template>
  <t-dialog v-model:visible="visible" header="分配权限" width="750px" :close-btn="true">
    <t-form>
      <t-form-item label="角色名称">
        <t-tag theme="primary" variant="light">{{ role.name }}</t-tag>
      </t-form-item>
      <t-form-item label="角色编码">
        <t-tag theme="primary" variant="light">{{ role.code }}</t-tag>
      </t-form-item>
      <t-form-item label="菜单权限">
        <t-card class="w-full">
          <template #header>
            <t-space>
              <div>
                全选/全不选:
                <t-switch v-model="checkAll" :label="['是', '否']" @change="onCheckAll"/>
              </div>
              <div>
                全部展开/折叠:
                <t-switch v-model="expandAll" :label="['展开', '折叠']"/>
              </div>
            </t-space>
          </template>
          <t-tree
              ref="treeRef"
              :data="menuTree"
              hover
              checkable
              :expand-all="expandAll"
              :keys="{label: 'name', value: 'id', children: 'children'}">
          </t-tree>
        </t-card>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<style scoped>
.t-card {
  border-radius: 0;
}

:deep(.t-card__header) {
  border-bottom: 1px solid var(--td-component-border);
}
</style>

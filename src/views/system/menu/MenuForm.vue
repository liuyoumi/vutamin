<script setup>
import {MenuApi} from "@/api/system/menu/index.js";
import {buildTree} from "@/share/index.js";
import {DICT_TYPE} from "@/share/dict.js";
import {DictSelect} from "@/components/DictSelect";
import {IconSelect} from "@/components/IconSelect";

const emits = defineEmits(["success"]);

const visible = ref(false);
const open = async (type, id, parentId = 0) => {
  visible.value = true;
  formRef.value.reset();
  formType.value = type;
  model.parentId = parentId;
  if (id) {
    const data = await MenuApi.getDetail(id);
    Object.assign(model, data);
  }
  await getTree();
};
defineExpose({
  open,
});

const model = reactive({
  id: undefined,
  parentId: 0,
  name: "",
  type: 1,
  icon: "",
  path: "",
  component: "",
  componentName: "",
  permission: "",
  sort: undefined,
  status: 1,
  layout: 1,
  visible: true,
  keepAlive: true,
});
const rules = {
  name: [{required: true, message: "菜单名称必填"}],
  path: [{required: true, message: "路由地址必填"}],
  sort: [{required: true, message: "显示排序必填"}],
};

const formRef = ref();
const formType = ref();
const loading = ref(false);
const onSubmit = async () => {
  const valid = await formRef.value.validate();
  if (valid !== true) {
    return;
  }
  loading.value = true;
  try {
    if (formType.value === "create") {
      await MenuApi.create(model);
    } else {
      await MenuApi.update(model);
    }
    visible.value = false;
    emits("success");
  } finally {
    loading.value = false;
  }
};

/** 获取下拉框[上级菜单]的数据  */
const menuTree = ref([]); // 树形结构
const getTree = async () => {
  menuTree.value = [];
  const res = await MenuApi.getList();
  let menu = {id: 0, name: "主类目", children: []};
  menu.children = buildTree(res);
  menuTree.value.push(menu);
};
</script>

<template>
  <t-drawer
      v-model:visible="visible"
      size="large"
      header="新增"
      :close-btn="true"
      :confirm-btn="{disabled: loading}"
      @confirm="onSubmit">
    <t-form ref="formRef" :data="model" :rules="rules" reset-type="initial">
      <t-form-item label="上级菜单" name="parentId">
        <t-tree-select v-model="model.parentId" :data="menuTree" :keys="{label: 'name', value: 'id'}"/>
      </t-form-item>
      <t-form-item label="菜单名称" name="name">
        <t-input v-model="model.name" placeholder="请输入菜单名称"></t-input>
      </t-form-item>
      <t-form-item label="菜单类型" name="type">
        <DictSelect
            v-model="model.type"
            :dict-type="DICT_TYPE.SYSTEM_MENU_TYPE"
            value-type="number"
            select-type="radio"
        />
      </t-form-item>
      <t-form-item label="菜单图标" name="icon" v-if="model.type !== 3">
        <IconSelect v-model="model.icon" placeholder="请选择菜单图标"/>
      </t-form-item>
      <t-form-item
          label="路由地址"
          name="path"
          tips="访问的路由地址，如：`user`。如需外网地址时，则以 `http(s)://` 开头"
          v-if="model.type !== 3">
        <t-input v-model="model.path" placeholder="请输入路由地址"></t-input>
      </t-form-item>
      <t-form-item label="组件地址" name="component" v-if="model.type === 2">
        <t-input v-model="model.component" placeholder="例如说: system/user/index"></t-input>
      </t-form-item>
      <t-form-item label="组件名称" name="componentName" v-if="model.type === 2">
        <t-input v-model="model.componentName" placeholder="例如说：SystemUser"></t-input>
      </t-form-item>
      <t-form-item
          label="权限标识"
          name="permission"
          tips='Controller 方法上的权限字符，如：@SaCheckPermission("user-add")'
          v-if="model.type !== 1">
        <t-input v-model="model.permission" placeholder="请输入权限标识"></t-input>
      </t-form-item>
      <t-form-item label="显示排序" name="sort">
        <t-input-number v-model="model.sort" :min="0"/>
      </t-form-item>
      <t-form-item
          label="菜单状态"
          name="status"
          tips="选择禁用时，该菜单不会显示在侧边栏并且无法访问">
        <DictSelect
            v-model="model.status"
            :dict-type="DICT_TYPE.COMMON_STATUS"
            value-type="number"
            select-type="radio"
        />
      </t-form-item>
      <t-form-item
          label="基础布局"
          name="layout"
          tips="选择禁用时，该菜单不会经过包装而是直接渲染到页面上"
          v-if="model.type !== 3">
        <DictSelect
            v-model="model.layout"
            :dict-type="DICT_TYPE.COMMON_STATUS"
            value-type="number"
            select-type="radio"
        />
      </t-form-item>
      <t-form-item
          label="显示状态"
          name="visible"
          tips="选择隐藏时，该菜单将不会显示在侧边栏但仍然可以访问"
          v-if="model.type !== 3">
        <t-radio-group v-model="model.visible" variant="primary-filled">
          <t-radio-button label="显示" :value="true"/>
          <t-radio-button label="隐藏" :value="false"/>
        </t-radio-group>
      </t-form-item>
      <t-form-item
          label="缓存状态"
          name="keepAlive"
          tips="选择缓存时，则会被 `keep-alive` 缓存，必须填写「组件名称」字段"
          v-if="model.type === 2">
        <t-radio-group v-model="model.keepAlive" variant="primary-filled">
          <t-radio-button label="开启" :value="true"/>
          <t-radio-button label="关闭" :value="false"/>
        </t-radio-group>
      </t-form-item>
    </t-form>
  </t-drawer>
</template>

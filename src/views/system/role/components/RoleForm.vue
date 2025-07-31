<script setup>
import {DictSelect} from "@/components/DictSelect";
import {DICT_TYPE} from "@/share/dict.js";
import {required} from "@/share/const.js";
import {RoleApi} from "@/api/system/role/index.js";

const visible = ref(false);
const open = async (type, id) => {
  visible.value = true;
  formType.value = type;
  formRef.value.reset();
  if (id) {
    const data = await RoleApi.getDetail(id);
    Object.assign(model, data);
  }
};
defineExpose({open});

const emits = defineEmits(["success"]);

const model = reactive({
  name: undefined,
  code: undefined,
  remark: undefined,
  status: 1,
});
const rules = {
  name: [required],
  code: [required],
};

const formRef = ref();
const formType = ref();
const loading = ref(false);
const onSubmit = async () => {
  const err = await formRef.value.validate();
  if (err !== true) {
    return;
  }
  loading.value = true;
  try {
    if (formType.value === "create") {
      await RoleApi.create(model);
    } else {
      await RoleApi.update(model);
    }
    visible.value = false;
    emits("success");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <t-dialog
      v-model:visible="visible"
      header="新增"
      :close-btn="true"
      :close-on-overlay-click="false"
      :confirm-loading="loading"
      @confirm="onSubmit">
    <t-form ref="formRef" :data="model" :rules="rules" reset-type="initial">
      <t-form-item label="角色名称" name="name">
        <t-input v-model="model.name" placeholder="请输入角色名称"></t-input>
      </t-form-item>
      <t-form-item label="角色编码" name="code">
        <t-input v-model="model.code" placeholder="请输入角色编码"></t-input>
      </t-form-item>
      <t-form-item label="描述" name="remark">
        <t-textarea v-model="model.remark" placeholder="请填写描述"></t-textarea>
      </t-form-item>
      <t-form-item label="状态" name="status">
        <DictSelect
            v-model="model.status"
            :dict-type="DICT_TYPE.COMMON_STATUS"
            select-type="radio"
            value-type="number"
        />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script setup>
const visible = ref(false);
const open = (type, id) => {
  visible.value = true;
  formType.value = type;
};
defineExpose({open});

const formType = ref();

const submit = () => {

};
</script>

<template>
  <t-dialog v-model:visible="visible" title="新增">

  </t-dialog>
</template>

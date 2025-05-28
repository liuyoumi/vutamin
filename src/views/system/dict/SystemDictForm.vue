<script setup>
const visible = ref(false);
const open = (type, id) => {
  visible.value = true;
};
defineExpose({open});

</script>

<template>
  <t-dialog v-model:visible="visible">

  </t-dialog>
</template>

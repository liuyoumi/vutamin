<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <t-button v-bind="$attrs">
    <template #icon>
      <t-icon :name="icon"/>
    </template>
    <slot></slot>
  </t-button>
</template>
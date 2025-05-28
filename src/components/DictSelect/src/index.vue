<script setup>
import {getDictOptions} from "@/share/dict.js";

const props = defineProps({
  dictType: {
    type: String,
    required: true,
  },
  valueType: {
    type: String,
    default: "str",
  },
  selectType: {
    type: String,
    default: "select",
  },
});

const options = computed(() => {
  return getDictOptions(props.dictType, props.valueType);
});
</script>

<template>
  <t-select v-if="selectType === 'select'" :options="options" v-bind="$attrs"/>
</template>

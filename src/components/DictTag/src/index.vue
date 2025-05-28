<script setup>
import {isArray, isBoolean, isNumber, isString} from "lodash-es";
import {getDictOptions} from "@/share/dict.js";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Boolean, Array, null],
    required: true,
  },
  separator: {
    type: String,
    default: ",",
  },
  gutter: {
    type: Number,
    default: 5,
  },
});

const values = computed(() => {
  let {value, separator} = props;
  if (isNumber(value) || isBoolean(value)) {
    return [String(value)];
  }
  if (isString(value)) {
    return value.split(separator);
  }
  if (isArray(value)) {
    return value.map(String);
  }
  return [];
});

const options = computed(() => {
  return getDictOptions(props.type).filter(item => values.value.includes(item.value));
});

const themeColors = ["default", "primary", "warning", "danger", "success"];
</script>

<template>
  <t-space>
    <template v-for="item of options" :key="item.value">
      <t-tag
          :theme="item.color"
          variant="light"
          v-bind="{
            ...(themeColors.includes(item.color) ? {theme: item.color}: {color: item.color}) ,
            ...$attrs
          }">
        {{ item.label }}
      </t-tag>
    </template>
  </t-space>
</template>

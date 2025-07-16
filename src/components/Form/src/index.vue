<script setup>
import {h} from "vue";
import {fromPairs, isArray} from "lodash-es";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  label: {
    type: Boolean,
    default: true,
  },
  schema: {
    type: Array,
    required: true,
  },
});

const model = reactive({});
watchEffect(() => {
  if (isArray(props.schema)) {
    const pairs = fromPairs(props.schema.map(s => [s.field, s.value]));
    Object.assign(model, pairs, props.data);
  }
});

const labelWidth = computed(() => props.label ? "100px" : 0);

const formRef = ref();
defineExpose({
  model,
  reset: (...args) => formRef.value.reset(...args),
});
</script>

<template>
  <t-form ref="formRef" :data="model" reset-type="initial" :label-width="labelWidth" v-bind="$attrs">
    <template v-for="item of schema" :key="item.field">
      <t-form-item :label="label ? item.label : ''" :name="item.field">
        <Component :is="item.cell(h)" v-model="model[item.field]"/>
      </t-form-item>
    </template>
    <t-form-item v-if="$slots.operation">
      <slot name="operation"></slot>
    </t-form-item>
  </t-form>
</template>

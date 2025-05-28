<script setup>
import _ from "lodash-es";
import {componentMap} from "@/components/Form/src/meta.js";

const props = defineProps({
  label: {
    type: Boolean,
    default: true,
  },
  schemas: {
    type: Array,
    required: true,
  },
});

const model = reactive({});
watchEffect(() => {
  if (_.isArray(props.schemas)) {
    const pairs = _.fromPairs(props.schemas.map(s => [s.key, s.value]));
    Object.assign(model, pairs);
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
    <template v-for="item of schemas" :key="item.key">
      <t-form-item :label="label ? item.title : ''" :name="item.key">
        <Component :is="componentMap[item.component]" v-model="model[item.key]" v-bind="item.componentProps"/>
      </t-form-item>
    </template>
    <t-form-item v-if="$slots.operation">
      <slot name="operation"></slot>
    </t-form-item>
  </t-form>
</template>

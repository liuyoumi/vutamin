<script setup>
import {Form} from "@/components/Form";

const props = defineProps({
  schemas: Array,
});

const emits = defineEmits(["search"]);

const schemas = inject("search:schemas") || props.schemas;

const formRef = ref();
const onReset = () => {
  formRef.value.reset();
  emits("search", formRef.value.model);
};

const onSearch = () => {
  emits("search", formRef.value.model);
};
</script>

<template>
  <Form ref="formRef" :label="false" layout="inline" :schemas="schemas">
    <template #operation>
      <t-space>
        <t-button variant="outline" @click="onReset">重置</t-button>
        <t-button theme="primary" @click="onSearch">搜索</t-button>
      </t-space>
    </template>
  </Form>
</template>

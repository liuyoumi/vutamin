<script setup>
import {Form} from "@/components/Form";

const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
  schema: Array,
});

const emits = defineEmits(["search"]);

onMounted(() => {
  // const {ctx} = getCurrentInstance();
  // const el = ctx.$el;
  // const gap = 24;
  //
  // const itemWidths = Array.from(el.querySelectorAll(".t-form__item")).map(item => item.offsetWidth);
  // const width = el.offsetWidth;
  // let sum = itemWidths[itemWidths.length - 1];
  // for (let i = 0; i < itemWidths.length; i++) {
  //   sum += itemWidths[i] + gap;
  //   if (sum >= width) {
  //     console.log(sum, i - 1);
  //     break;
  //   }
  // }
});

const {
  params,
} = inject("cruder") || props; // 注入搜索参数，回显表单
const schema = inject("searchSchema") || props.schema;

const formRef = ref();
/* 发送搜索事件 */
const onSearch = () => {
  emits("search", formRef.value.model);
};
/* 重置搜索参数，目的是回到默认搜索状态 */
const onReset = () => {
  formRef.value.reset();
  emits("search", formRef.value.model);
};
</script>

<template>
  <Form
      ref="formRef"
      :label="false"
      layout="inline"
      :data="params"
      :schema="schema"
      @keyup.enter="onSearch"
  >
    <template #operation>
      <t-space>
        <t-button theme="primary" @click="onSearch">搜索</t-button>
        <t-button theme="primary" variant="outline" @click="onReset">重置</t-button>
      </t-space>
    </template>
  </Form>
</template>

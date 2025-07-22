<script setup>
import {
  Table,
  PrimaryTable,
  EnhancedTable,
} from "tdesign-vue-next";

defineOptions({
  name: "Table",
});

const props = defineProps({
  mode: {
    type: String,
    default: "base",
    validator: (value) => {
      return ["base", "primary", "enhanced"].includes(value);
    },
  },
  cruder: Object,
  columns: Array,
  register: Function,
});

const modeMap = {
  base: Table,
  primary: PrimaryTable,
  enhanced: EnhancedTable,
};

const {
  list,
  total,
  loading,
  current,
  pageSize,
  pagination,
} = inject("cruder") || props.cruder;
const columns = inject("columns") || props.columns;

const pageOptions = computed(() => {
  return pagination.value ? {
    size: "medium",
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    onChange: e => {
      current.value = e.current;
      pageSize.value = e.pageSize;
    },
  } : null;
});

const tableRef = ref();
watch(tableRef, value => {
  if (props.register) {
    props.register(value);
  }
});
</script>

<template>
  <component
      :is="modeMap[mode]"
      :ref="register"
      row-key="id"
      :data="list"
      :loading="loading"
      :columns="columns"
      :pagination="pageOptions"
      table-layout="fixed"
      v-bind="$attrs"
  >
    <template v-for="(_, name) of $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </component>
</template>

<style scoped>
.t-table.t-size-s {
  font: var(--td-font-body-small);
}

.t-table :deep(.t-table__body .t-button) {
  padding-left: 0 !important;
}

.t-table :deep(.t-table__header th) {
  color: #666666;
  background-color: var(--td-bg-color-secondarycontainer);
}
</style>

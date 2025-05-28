<script setup>
defineOptions({
  name: "Table",
});

const props = defineProps({
  cruder: Object,
  columns: Array,
});

const {
  list,
  total,
  loading,
  current,
  pageSize,
} = inject("cruder") || props.cruder;
const columns = inject("columns") || props.columns;

</script>

<template>
  <t-table
      row-key="id"
      :data="list"
      :loading="loading"
      :columns="columns"
      :pagination="{
        size: 'medium',
        total: total,
        current: current,
        pageSize: pageSize,
      }"
      table-layout="fixed"
      v-bind="$attrs"
  >
    <template v-for="(_, name) of $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </t-table>
</template>

<style scoped>
.t-table.t-size-s {
  font: var(--td-font-body-small);
}

.t-table :deep(.t-table__body .t-button) {
  padding-left: 0 !important;
}

.t-table :deep(.t-table__header th) {
  background-color: var(--td-bg-color-secondarycontainer);
}
</style>

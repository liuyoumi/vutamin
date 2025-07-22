<script setup>
import {cloneDeep} from "lodash-es";
import {useCrudSchemas} from "@/hooks/useCrudSchemas.js";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  cruder: {
    type: Object,
    required: true,
  },
  schemas: {
    type: Array,
    required: true,
  },
});

const {
  id,
  cruder,
  schemas,
} = props;

const cacheKey = id.toUpperCase() + "_TABLE_FIELDS";

const {
  fields,
  columns,
  searchSchema,
} = useCrudSchemas(schemas, cacheKey);

provide("cruder", cruder);
// 提供给Table组件使用
provide("columns", columns);
// 提供给Search组件使用
provide("searchSchema", searchSchema);
// 提供给ColumnSetting使用
provide("fields", cloneDeep(fields.value));
provide("schemas", schemas);
provide("setSharedFields", value => fields.value = value);
</script>

<template>
  <section class="m-3">
    <t-card :bordered="false">
      <t-space class="w-full" size="large" direction="vertical">
        <slot></slot>
      </t-space>
    </t-card>
  </section>
</template>

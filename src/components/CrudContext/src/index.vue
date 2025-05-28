<script setup>
import {useSchemas} from "@/hooks/useSchemas.js";
import _ from "lodash-es";

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
  searchSchemas,
} = useSchemas(schemas, cacheKey);

provide("cruder", cruder);
// 提供给Table组件使用
provide("columns", columns);
// 提供给Search组件使用
provide("search:schemas", searchSchemas);
// 提供给ColumnSetting使用
provide("fields", _.cloneDeep(fields.value));
provide("schemas", schemas);
provide("setSharedFields", value => fields.value = value);
</script>

<template>
  <section class="m-3">
    <t-card :bordered="false">
      <t-space size="large" direction="vertical">
        <slot></slot>
      </t-space>
    </t-card>
  </section>
</template>

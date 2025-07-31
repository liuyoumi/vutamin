<script setup>
import {ColumnSetting} from "@/components/CrudContext/index.js";

defineOptions({
  name: "Toolbar",
});
</script>

<template>
  <div class="toolbar">
    <div class="flex items-center justify-between">
      <div class="toolbar-primary">
        <slot></slot>
      </div>
      <div class="toolbar-auxiliary">
        <t-space>
          <slot name="right">
            <ColumnSetting/>
          </slot>
        </t-space>
      </div>
    </div>
  </div>
</template>

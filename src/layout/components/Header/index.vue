<script setup>
import {Avatar, FullScreen, Notice} from "@/layout/components/index.js";
</script>

<template>
  <t-header class="border-b border-b-solid border-b-[#e5e5e5] flex items-center justify-end pr-2">
    <t-space size="small">
      <FullScreen/>
      <Notice/>
      <Avatar/>
    </t-space>
  </t-header>
</template>

<style scoped>
.t-is-active :deep(.t-menu__content) {
  position: relative;

  &::after {
    position: absolute;
    bottom: -4px;
    left: 50%;
    width: 22px;
    height: 3px;
    content: "";
    background: var(--td-brand-color);
    transform: translate(-50%);
  }
}
</style>

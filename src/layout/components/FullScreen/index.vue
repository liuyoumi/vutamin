<script setup>
import {useFullscreen} from "@vueuse/core";

const {toggle, isFullscreen} = useFullscreen();
</script>

<template>
  <t-button shape="circle" variant="text" @click="toggle">
    <template #icon>
      <t-icon v-if="isFullscreen" name="fullscreen-exit-1" size="22px"/>
      <t-icon v-else name="fullscreen-1" size="22px"/>
    </template>
  </t-button>
</template>
<script setup>
import {IconButton} from "@/components/IconButton";

const {
  loading,
  getList,
} = inject("cruder");
const onRefresh = async () => {
  getList();
};
</script>

<template>
  <IconButton
      icon="refresh"
      shape="circle"
      variant="outline"
      :loading="loading"
      @click="onRefresh"
  />
</template>
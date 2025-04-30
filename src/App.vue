<script setup>
import Layout from "@/layout/Layout.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const isLayout = computed(() => route.meta.layout);
</script>

<template>
  <t-config-provider>
    <Layout v-if="isLayout"/>
    <router-view v-else/>
  </t-config-provider>
</template>
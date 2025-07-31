<script setup>
import {useRoute} from "vue-router";
import Layout from "@/layout/Layout.vue";

const route = useRoute();
const isSingle = computed(() => route.meta.single);
</script>

<template>
  <t-config-provider>
    <router-view v-if="isSingle"/>
    <Layout v-else/>
  </t-config-provider>
</template>

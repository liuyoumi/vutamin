<script setup>
import {useRoute, useRouter} from "vue-router";

defineOptions({name: "Redirect"});

const route = useRoute();
const router = useRouter();
const {params, query} = route;

router.replace({
  path: params.path.startsWith("/") ? params.path : `/${params.path}`,
  query,
});
</script>

<template>
  <div></div>
</template>

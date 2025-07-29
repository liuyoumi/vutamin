<script setup>
import Item from "./Item.vue";
import {useRoute} from "vue-router";
import Logo from "@/layout/components/Logo/index.vue";
import {useUserStore} from "@/store/modules/user.js";

const route = useRoute();
const activePath = computed(() => route.matched.at(-1)?.path);
const userStore = useUserStore();
const expandPaths = ref([]);
</script>

<template>
  <t-aside width="200px">
    <t-menu width="200px" :value="activePath" v-model:expanded="expandPaths">
      <template #logo>
        <Logo/>
      </template>
      <Item :routes="userStore.routes"/>
    </t-menu>
  </t-aside>
</template>

<style scoped>
:deep(.t-menu) {
  background-image: url("@/assets/imgs/menu-bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;

  .t-menu__item {
    height: var(--td-comp-size-xl);
    margin: 0 auto .5rem;
    line-height: var(--td-comp-size-xl);
    border-radius: 2rem;
  }
}
</style>

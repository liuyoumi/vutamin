<script setup>
import {useRoute} from "vue-router";
import Item from "./Item.vue";
import {flatMap, isArray} from "lodash-es";

const route = useRoute();

// 当前访问路径
const activePath = computed(() => route.matched.at(-1).path);

// 当前访问路径的根路由
const rootRoute = computed(() => route.matched.at(0));
const hasChildren = computed(() => rootRoute.value?.children?.length > 0);

// 所有待展开的子菜单路径
const expandPaths = computed(() => collectExpandPaths(rootRoute.value?.children || []));
const collectExpandPaths = (routes) => {
  return flatMap(routes, item => {
    if (isArray(item.children) && item.children.length) {
      return [item.path, ...collectExpandPaths(item.children)];
    }
    return [];
  });
};
</script>

<template>
  <t-aside v-if="hasChildren" width="200px">
    <t-menu width="200px" :value="activePath" :default-expanded="expandPaths">
      <Item :routes="rootRoute.children" :parent-path="rootRoute.path"/>
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
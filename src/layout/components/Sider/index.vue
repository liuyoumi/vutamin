<script setup>
import {useRoute} from "vue-router";
import Item from "./Item.vue";
import {flatMap, isArray} from "lodash-es";

const route = useRoute();
// 根路由
const rootRoute = computed(() => route.matched.at(0));
console.log(route, rootRoute);
// 当前访问路径
const activePath = computed(() => route.matched.at(-1).path);
// 是否有子路由
const hasChildren = computed(() => rootRoute.value?.children?.length > 0);

// 初始化时默认展开所有子菜单路径
watch(rootRoute, ({path, children}) => {
  if (watchSet.has(path)) {
    return;
  }
  watchSet.add(path);
  expandPaths.value = collectExpandPaths(children);
});
const watchSet = new Set();
const expandPaths = ref([]);
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
    <t-menu width="200px" :value="activePath" v-model:expanded="expandPaths">
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
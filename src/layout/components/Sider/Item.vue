<script setup>
import {isArray} from "lodash-es";

const props = defineProps({
  routes: {
    type: Array,
    required: true,
  },
  parentPath: {
    type: String,
    default: "/",
  },
});

/**
 * 可访问的路由路径，传递给MenuItem供内部的路由系统跳转
 * SubMenu不需要这个路径，因为菜单需要默认展开所有子菜单，依据是原始路由的path（没有拼接过的）
 * */
const getLink = (path) => {
  return (props.parentPath + "/" + path).replace(/\/+/g, "/");
};
</script>

<template>
  <template v-for="item of routes.filter(r => r.meta?.visible)" :key="item.path">
    <t-submenu
        v-if="isArray(item.children) && item.children.length"
        :value="item.path"
        :title="item.meta.title"
    >
      <template #icon>
        <t-icon :name="item.meta.icon"/>
      </template>
      <Item :routes="item.children" :parent-path="getLink(item.path)"/>
    </t-submenu>
    <t-menu-item
        v-else
        :href="getLink(item.path)"
        :value="getLink(item.path)"
        router-link
    >
      <template #icon>
        <t-icon :name="item.meta?.icon"/>
      </template>
      <span>{{ item.meta.title }}</span>
    </t-menu-item>
  </template>
</template>

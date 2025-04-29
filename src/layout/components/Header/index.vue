<script setup>
import {useUserStore} from "@/store/modules/user.js";
import {Avatar, FullScreen, Logo, Notice} from "@/layout/components/index.js";
import {useRoute} from "vue-router";

const userStore = useUserStore();

const route = useRoute();
const activeMenuItem = computed(() => route.matched.at(0)?.path);
</script>

<template>
  <t-header class="border-b border-b-solid border-b-[#e5e5e5]">
    <t-head-menu :value="activeMenuItem">
      <template #logo>
        <Logo/>
      </template>
      <t-menu-item
          v-for="item of userStore.rootRoutes"
          :key="item.path"
          :href="item.path"
          :value="item.path"
          router-link
      >
        {{ item.meta.title }}
      </t-menu-item>
      <template #operations>
        <t-space size="small">
          <FullScreen/>
          <Notice/>
          <Avatar/>
        </t-space>
      </template>
    </t-head-menu>
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
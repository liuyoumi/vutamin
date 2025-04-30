<script setup>
import {useTagsViewStore} from "@/store/modules/tagsView.js";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const activeTab = ref();
const tagsViewStore = useTagsViewStore();
watch(
    route,
    () => {
      activeTab.value = route.fullPath;
      tagsViewStore.addView(route);
    },
);

const router = useRouter();

const onChange = (to) => {
  router.push(to);
};

/* 只有当标签大于1时才能删除 */
const removable = computed(() => tagsViewStore.views.length > 1);
const onRemove = ({value}) => {
  tagsViewStore.removeView(value);
  if (value === route.fullPath) {
    router.push(tagsViewStore.views.at(-1));
  }
};
</script>

<template>
  <section>
    <t-tabs
        v-model="activeTab"
        scroll-position="auto"
        @change="onChange"
        @remove="onRemove"
    >
      <t-tab-panel
          v-for="item of tagsViewStore.views"
          :key="item.fullPath"
          :label="item.title"
          :value="item.fullPath"
          :removable="removable"
      >
      </t-tab-panel>
    </t-tabs>
  </section>
</template>

<style scoped>
:deep(.t-tabs__bar) {
  background-color: transparent;
}
</style>
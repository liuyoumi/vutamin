<script setup>
import {useTagsViewStore} from "@/store/modules/tagsView.js";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const active = ref();
const tagsViewStore = useTagsViewStore();
watch(
    route,
    () => {
      active.value = route.fullPath;
      if (active.value === "/") {
        return;
      }
      tagsViewStore.addView(route);
    },
    {immediate: true},
);

const router = useRouter();

const onChange = (to) => {
  router.push(to);
};

const onRemove = ({value}) => {
  tagsViewStore.removeView(value);
  if (tagsViewStore.views.length === 0) {
    router.replace("/");
    return;
  }
  if (value === route.fullPath) {
    router.push(tagsViewStore.views.at(-1));
  }
};

const onRefresh = () => {
  router.replace("/redirect" + route.fullPath);
};
</script>

<template>
  <section>
    <t-tabs
        v-model="active"
        scroll-position="auto"
        @change="onChange"
        @remove="onRemove"
    >
      <t-tab-panel value="/">
        <template #label>
          <t-icon name="home"></t-icon>
        </template>
      </t-tab-panel>
      <t-tab-panel
          v-for="item of tagsViewStore.views"
          :key="item.fullPath"
          :label="item.title"
          :value="item.fullPath"
          :removable="true"
      >
      </t-tab-panel>
      <template #action>
        <div class="flex items-center justify-center h-[47px] px-5 cursor-pointer" @click="onRefresh">
          <t-icon name="refresh" color="#999"/>
        </div>
      </template>
    </t-tabs>
  </section>
</template>

<style scoped>
:deep(.t-tabs__bar) {
  background-color: transparent;
}
</style>

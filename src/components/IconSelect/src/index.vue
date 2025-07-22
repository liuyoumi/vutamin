<template>
  <t-popup
      v-model="visible"
      :overlay-inner-style="overlayStyle"
      trigger="click"
      placement="bottom">
    <t-input v-model="model" readonly :placeholder="placeholder">
      <template #prefix-icon>
        <t-icon v-if="model" :name="model"/>
      </template>
    </t-input>
    <template #content>
      <div class="t-input__filter">
        <t-radio-group v-model="style" variant="default-filled">
          <t-radio-button label="描边风格" value="outline"/>
          <t-radio-button label="填充风格" value="filled"/>
        </t-radio-group>
        <t-input v-model="keywords" class="flex-1" placeholder="输入图标名称或关键词搜索"></t-input>
      </div>
      <t-tabs v-model="active" theme="normal" scroll-position="auto">
        <t-tab-panel
            v-for="(item, key) of iconMap"
            :key="key"
            :label="item.labelCN"
            :value="key">
          <template #panel>
            <div class="flex flex-wrap content-start h-100 overflow-y-auto">
              <div v-for="item of iconList" :key="item.name" class="t-icons-view__wrapper" @click="setModel(item.name)">
                <span v-html="item.svgString" class="leading-none"></span>
              </div>
            </div>
          </template>
        </t-tab-panel>
      </t-tabs>
    </template>
  </t-popup>
</template>
<script setup>
import {manifest} from "./data.js";
import {isArray, trim} from "lodash-es";

defineProps({
  placeholder: {
    type: String,
    default: "请选择图标",
  },
});

const visible = ref(false);
const overlayStyle = (triggerElement) => {
  return {
    width: triggerElement.clientWidth + "px",
    padding: 0,
    backgroundColor: "#f5f5f5",
  };
};

const model = defineModel();
const setModel = (iconName) => {
  model.value = iconName;
  visible.value = false;
};

const style = ref("outline");
const active = ref("All");
const keywords = ref("");
const iconMap = computed(() => {
  const kws = keywords.value;
  if (trim(kws).length === 0) {
    return {All: {labelCN: "全部"}, ...manifest[style.value]};
  }

  const map = manifest[style.value];
  const resultMap = {All: {labelCN: "全部"}};
  for (const key in map) {
    const data = map[key];
    const icons = data.icons.filter(item => item.name.includes(kws) || item.keywords.includes(kws));
    if (icons.length) {
      resultMap[key] = {...data, icons};
    }
  }
  return resultMap;
});

const allIcons = computed(() => {
  const result = [];
  for (const key in iconMap.value) {
    const data = iconMap.value[key];
    if (isArray(data.icons)) {
      result.push(...data.icons);
    }
  }
  return result;
});

const iconList = computed(() => {
  if (active.value === "All") {
    return allIcons.value;
  }
  return iconMap.value[active.value].icons;
});
</script>

<style scoped>
:deep(.t-tabs__btn) {
  height: 24px !important;
  width: 24px;
  border: none;
  background-color: #eee;
  border-radius: 3px;
}

:deep(.t-tabs__operations) {
  top: 4px;
  border: none;
}

:deep(.t-tabs__nav-item) {
  font-size: 12px;
  height: 32px !important;
  line-height: 32px !important;
}

:deep(.t-popup__content) {
  padding: 0 !important;
}

:deep(.t-tabs__header) {
  background-color: #f5f5f5;
}

.t-input__filter {
  display: flex;
  grid-column-gap: 16px;
  padding: 8px 8px 0;
  margin-bottom: 8px;

  :deep(.t-input) {
    background-color: transparent;
  }
}

.t-icons-view__wrapper {
  display: flex;
  justify-content: center;
  width: 10%;
  padding: 12px 0;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
}
</style>

<script setup>
import {useDateFormat, useNow} from "@vueuse/core";
import {useUserStore} from "@/store/modules/user.js";

const now = useNow();
const dateFormatted = useDateFormat(now, "YYYY年MM月DD日 HH:mm:ss dddd");

const userStore = useUserStore();
</script>

<template>
  <t-card :bordered="false">
    <template #header>
      <div class="flex justify-between items-center w-full">
        <div class="font-bold text-4">工作台</div>
        <div class="text-[#333]">{{ dateFormatted }}</div>
      </div>
    </template>
    <div class="flex justify-between items-center">
      <t-space align="center">
        <t-avatar size="100px">牛</t-avatar>
        <t-space direction="vertical">
          <div class="font-bold text-[18px]">下午好{{ userStore.name }}~，开始您一天的工作吧！</div>
          <div class="text-[#999] text-4">今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</div>
        </t-space>
      </t-space>
      <t-space :size="32">
        <t-statistic title="Total Assets" :value="56.32" unit="%">
          <template #prefix>
            <t-icon name="control-platform"></t-icon>
          </template>
        </t-statistic>
        <t-statistic title="Total Assets" :value="176059" prefix="$" unit="%" trend="increase"/>
        <t-statistic title="Total Assets" :value="62.58" unit="%">
          <template #suffix>
            <t-icon name="arrow-triangle-down" style="color: #ee4d38"></t-icon>
          </template>
        </t-statistic>
      </t-space>
    </div>
  </t-card>
</template>

<style scoped>
:deep(.t-card__header) {
  border-bottom: 1px solid var(--td-border-level-1-color);
}
</style>

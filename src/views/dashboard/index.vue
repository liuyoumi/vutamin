<script setup>
import Workbench from "./components/Workbench.vue";
import {Chart} from "@/components/Chart";
import {loginTrendOptions, roleStatsOptions} from "@/views/dashboard/data.js";
</script>

<template>
  <div class="py-3">
    <!-- 卡片区 -->
    <Workbench/>
    <div class="px-3 pt-3">
      <t-card :bordered="false">
        <Chart :options="loginTrendOptions"/>
      </t-card>
    </div>
    <!-- 图表区 -->

    <!-- 日志区 -->
  </div>
</template>

<style scoped>

</style>

<script setup>
import dayjs from "dayjs";
import {Chart} from "@/components/Chart";
import {isEmpty, merge} from "lodash-es";
import {StatisticsApi} from "@/api/statistics/index.js";
import {createCrudContext, Table} from "@/components/CrudContext/index.js";
import {chartOptions, graphKeyMap, panels, schemas} from "@/views/home/data.js";

onMounted(() => {
  loadData();
});

const {cruder, CrudContextProvider} = createCrudContext({
  id: "home",
  schemas,
  immediate: false,
  getListApi: StatisticsApi.getList,
  defaultParams: {
    dates: [
      dayjs().subtract(6, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
  },
});

const {params, getList} = cruder;

const data = ref({});
const loadData = async () => {
  // 列表数据
  getList();
  // 统计、图表数据
  const res = await StatisticsApi.getChart();
  const isRate = str => str.endsWith("率");
  const newOptions = {
    xAxis: {
      data: res.graphData.date,
    },
    series: Object.keys(graphKeyMap).map(key => {
      const value = graphKeyMap[key];
      return {
        symbol: "none",
        type: "line",
        name: value,
        yAxisIndex: isRate(value) ? 1 : 0,
        data: res.graphData[key].map(parseFloat),
        tooltip: {
          valueFormatter: e => isRate(value) ? e + "%" : e,
        },
      };
    }),
  };
  merge(chartOptions, newOptions);
  data.value = res;
};

const onSortChange = value => {
  if (isEmpty(value)) {
    params.sortingFields = [];
  } else {
    params.sortingFields = [
      {
        field: value.sortBy,
        order: value.descending ? "desc" : "asc",
      },
    ];
  }
  getList();
};

const getImageUrl = (index) => {
  return new URL(`../../assets/imgs/home/${index + 1}.png`, import.meta.url).href;
};
</script>

<template>
  <CrudContextProvider>
    <div>
      <div class="flex items-center justify-between mb-2">
        <h3 class="py-4">数据预览</h3>
        <div class="flex items-center max-md:hidden">
          <span class="mr-4">时间</span>
          <t-date-range-picker
              v-model="params.dates"
              :disable-date="{after: dayjs().format('YYYY-MM-DD')}"
              @change="loadData"
          />
        </div>
      </div>
      <t-row :gutter="16">
        <template v-for="(item, index) of panels" :key="item.key">
          <t-col :xs="12" :sm="6" :lg="4" :xl="3" class="mb-5">
            <div class="flex cursor-pointer bg-[#f5f7f8] rounded-2 px-6 py-6">
              <div class="w-1 rounded-1 mr-4" :style="{ backgroundColor: item.color }"></div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  {{ item.label }}
                  <img class="w-[32px] h-[32px]" :src="getImageUrl(index)" alt="1"/>
                </div>
                <div class="text-[#666] text-6">{{ data[item.key] || 1000 }}</div>
              </div>
            </div>
          </t-col>
        </template>
      </t-row>
    </div>
    <div>
      <h3>数据报表</h3>
      <Chart :options="chartOptions"/>
    </div>
    <div>
      <h3>数据统计</h3>
      <Table size="small" @sort-change="onSortChange"/>
    </div>
  </CrudContextProvider>
</template>

<script setup>
import * as echarts from "echarts";
import {isString} from "lodash-es";

const props = defineProps({
  width: {
    type: [Number, String],
    default: "",
  },
  height: {
    type: [Number, String],
    default: "500px",
  },
  options: {
    type: Object,
    required: true,
  },
});

const styles = computed(() => {
  const {width, height} = props;
  return {
    width: isString(width) ? width : `${width}px`,
    height: isString(height) ? height : `${height}px`,
  };
});

let chart;
const chartRef = ref();
const onResize = () => {
  chart && chart.resize();
};
onMounted(() => {
  chart = echarts.init(chartRef.value);
  chart.setOption(props.options);
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <div ref="chartRef" :style="styles"></div>
</template>

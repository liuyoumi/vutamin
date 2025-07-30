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

watch(() => props.options, (value) => {
  if (chart) {
    chart.setOption(value);
  }
}, {deep: true});

const styles = computed(() => {
  const {width, height} = props;
  return {
    width: isString(width) ? width : `${width}px`,
    height: isString(height) ? height : `${height}px`,
  };
});

let chart;
const wrapRef = ref();
const onResize = () => {
  chart && chart.resize();
};
onMounted(() => {
  chart = echarts.init(wrapRef.value);
  chart.setOption(props.options);
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <div ref="wrapRef" :style="styles"></div>
</template>

<script setup>
import {Vue3Lottie} from "vue3-lottie";
import NotFound from "@/assets/lottie/404.json";

defineProps({
  type: {
    type: String,
    default: "404",
    validator(value) {
      return ["404", "500", "403"].includes(value);
    },
  },
});

const errorMap = {
  "404": {
    data: NotFound,
  },
};

</script>

<template>
  <div class="flex justify-center items-center h-100vh">
    <Vue3Lottie width="60%" :animation-data="errorMap[type].data"/>
  </div>
</template>

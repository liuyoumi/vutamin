<script setup>
import {useUserStore} from "@/store/modules/user.js";
import {User1Icon,LogoutIcon} from "tdesign-icons-vue-next";

const options = reactive([
  {
    content: "个人中心",
    value: 1,
    prefixIcon: h(User1Icon),
  },
  {
    content: "退出登录",
    value: 2,
    theme: "warning",
    prefixIcon: h(LogoutIcon),
  },
]);
const userStore = useUserStore();
</script>

<template>
  <t-dropdown :options="options" :min-column-width="100" trigger="click">
    <t-button variant="text">
      <template #icon>
        <img class="w-7 h-7 rounded-full mr-2" src="@/assets/imgs/avatar.png" alt="avatar">
      </template>
      {{ userStore.name }}
      <template #suffix>
        <t-icon name="chevron-down"></t-icon>
      </template>
    </t-button>
  </t-dropdown>
</template>
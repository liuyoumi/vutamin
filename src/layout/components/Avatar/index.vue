<script setup>
import {useUserStore} from "@/store/modules/user.js";
import {User1Icon, PoweroffIcon} from "tdesign-icons-vue-next";
import {useRouter} from "vue-router";
import {useTagsViewStore} from "@/store/modules/tagsView.js";

const options = reactive([
  {
    content: "个人中心",
    value: 1,
    prefixIcon: () => h(User1Icon),
  },
  {
    content: "退出登录",
    value: 2,
    theme: "error",
    prefixIcon: () => h(PoweroffIcon),
  },
]);
const router = useRouter();
const userStore = useUserStore();
const tagsViewStore = useTagsViewStore();

const onClick = ({value}) => {
  if (value === 2) {
    userStore.logout();
    tagsViewStore.clearViews();
    router.replace("/login");
  }
};
</script>

<template>
  <t-dropdown :options="options" :min-column-width="100" trigger="click" @click="onClick">
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
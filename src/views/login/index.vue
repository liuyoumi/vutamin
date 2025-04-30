<script setup>
import {AuthApi} from "@/api/auth/index.js";
import {useRouter} from "vue-router";
import {MessagePlugin} from "tdesign-vue-next";
import {setToken} from "@/share/auth.js";
import {Vue3Lottie} from "vue3-lottie";
import WorkLottieData from "@/assets/lottie/working.json";

const formModel = reactive({
  account: undefined,
  password: undefined,
});
const formRules = reactive({
  account: [{required: true, message: "账号必填"}],
  password: [{required: true, message: "密码必填"}],
});

const loading = ref(false);
const router = useRouter();
const onSubmit = async ({firstError}) => {
  if (firstError) {
    return;
  }
  loading.value = true;
  const data = await AuthApi.login(formModel).finally(() => loading.value = false);
  setToken(data);
  await MessagePlugin.success("欢迎回来");
  await router.push("/");
};
</script>

<template>
  <div class="h-[100vh] overflow-hidden flex bg-[#f5f5f5] page">
    <div class="flex-1 max-lg:hidden">
      <Vue3Lottie :animation-data="WorkLottieData"/>
    </div>
    <div class="w-[45%] max-lg:w-full flex items-center justify-center">
      <div class="w-[55%] min-w-100">
        <div class="title">
          Welcome to Vutamin!
        </div>
        <div class="mt-[var(--td-comp-margin-xxxxl)]">
          <t-form
              :data="formModel"
              :rules="formRules"
              :label-width="0"
              @submit="onSubmit"
          >
            <t-form-item name="account">
              <t-input
                  v-model="formModel.account"
                  size="large"
                  class="w-full"
                  placeholder="请输入账号"
              >
                <template #prefixIcon>
                  <t-icon name="user"/>
                </template>
              </t-input>
            </t-form-item>
            <t-form-item name="password">
              <t-input
                  v-model="formModel.password"
                  type="password"
                  size="large"
                  placeholder="请输入登录密码"
              >
                <template #prefixIcon>
                  <t-icon name="lock-on"/>
                </template>
              </t-input>
            </t-form-item>
            <div class="flex justify-between items-center mb-10">
              <t-checkbox label="记住密码"/>
              <span class="text-primary">忘记密码</span>
            </div>
            <t-form-item>
              <t-button :loading="loading" size="large" type="submit" block>登录</t-button>
            </t-form-item>
          </t-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  background-image: url("https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr");
  background-repeat: no-repeat;
  background-size: 100%;
}

.title {
  padding: 1rem 0;
  text-align: center;
  font: var(--td-font-headline-medium);
  font-size: 30px;
  font-style: italic;
  color: var(--td-text-color-primary);
}

.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
</style>
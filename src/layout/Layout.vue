<script setup>
import {Sider, Header} from "./components";
</script>

<template>
  <t-layout class="min-h-[100vh]">
    <Header/>
    <t-layout>
      <Sider/>
      <t-layout>
        <t-content>
          <router-view/>
        </t-content>
      </t-layout>
    </t-layout>
  </t-layout>
</template>
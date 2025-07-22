<script setup>
import {Sider, Header, TagsView} from "./components";
</script>

<template>
  <t-layout class="min-h-[100vh]">
    <Header/>
    <t-layout>
      <Sider/>
      <t-layout class="min-w-0">
        <TagsView/>
        <t-content class="flex-basis-none! overflow-auto">
          <router-view/>
        </t-content>
      </t-layout>
    </t-layout>
  </t-layout>
</template>

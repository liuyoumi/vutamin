<script setup>
import {Sider, Header, TagsView } from "./components";
</script>

<template>
  <t-layout class="min-h-[100vh]">
    <Header/>
    <t-layout>
      <Sider/>
      <t-layout>
        <TagsView/>
        <t-content>
          <router-view/>
        </t-content>
      </t-layout>
    </t-layout>
  </t-layout>
</template>
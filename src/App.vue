<template>
  <!--<Header />-->
  <router-view />
</template>

<script setup>
import Header from './components/Header.vue'
import { initData } from './services/initService'

const data = initData();
</script>

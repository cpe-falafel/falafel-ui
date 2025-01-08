<template>
  <Header />
  <router-view />
</template>

<script setup>
import Header from './components/Header.vue'
import { initData } from './store/store'

const data = initData();
</script>

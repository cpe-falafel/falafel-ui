<template>
  <header class="header">
    <div class="header__logo">
      <img src="@/assets/images/logo.png" alt="Falafel Logo" />
    </div>
    <nav class="header__nav">
      <ul>
        <li><router-link to="/">Hub</router-link></li>
        <li><router-link to="/preview">Preview</router-link></li>
      </ul>
    </nav>
    <div class="header__user">
      <span class="material-symbols-outlined">
        account_circle
      </span>
    </div>
  </header>
</template>

<script setup>
  import "@/assets/styles/header.css";
</script>
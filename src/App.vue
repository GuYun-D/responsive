<template>
  <div>
    {{ isMobileTerminal }}
    <router-view />
  </div>
</template>

<script setup>
import { isMobileTerminal } from './utils/flexible.js'
</script>

<style lang="scss" scoped></style>

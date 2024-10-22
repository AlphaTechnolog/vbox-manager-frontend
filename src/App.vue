<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue"
import StatusNavbar from "./components/StatusNavbar.vue";
</script>

<template>
  <div class="flex justify-start items-center overflow-hidden">
    <sidebar />
    <div class="w-full h-[100vh] overflow-auto flex flex-col justify-start items-center gap-y-2">
      <status-navbar />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppState } from "@/stores";
import { onMounted } from "vue";

const appState = useAppState();

const { selectedVM } = storeToRefs(appState);

// reset selected vm when going to /
onMounted(() => {
  if (selectedVM !== undefined) {
    selectedVM.value = undefined;
  }
})
</script>

<template>
  <h1>hello</h1>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppState, useVms, type VM } from '@/stores';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const appState = useAppState();
const vmsStore = useVms();

const { selectedVM } = storeToRefs(appState);
const { vms } = storeToRefs(vmsStore);

const route = useRoute();

onMounted(() => {
  if (vms.value.length > 0) {
    selectedVM.value = vms.value.find((vm: VM) => {
      return vm.name === route.params.name as string;
    });
  }
})
</script>

<template>
  <h1>Selected vm is: {{ selectedVM?.name }}</h1>
</template>
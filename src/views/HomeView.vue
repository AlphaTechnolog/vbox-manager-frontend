<script setup lang="ts">
import { PhSmileyMelting } from "@phosphor-icons/vue";
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
  <main class="flex flex-col justify-center gap-y-2 items-center h-[80%]">
    <p class="text-dimmed_foreground">
      <PhSmileyMelting size="150px" />
    </p>
    <h3 class="font-semibold text-xl text-dimmed_foreground">
      Select a
      <span class="text-blue">
        virtual machine
      </span>
      to begin
    </h3>
  </main>
</template>
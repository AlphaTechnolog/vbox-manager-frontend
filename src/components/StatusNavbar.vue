<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PhPlay, PhStop, PhTrash, PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";

import { useSidebarState } from "@/stores";
import Badge from "./Badge.vue";

const sidebarState = useSidebarState();
const { showSidebar } = storeToRefs(sidebarState);
const { toggleSidebar } = sidebarState;
</script>

<template>
  <navbar class="w-full py-2 px-4 flex justify-between items-center border-b border-background_light">
    <div class="flex justify-center items-center gap-x-2">
      <button class="toggle-sidebar-button" @click="toggleSidebar">
        <ph-caret-left v-if="showSidebar" />
        <ph-caret-right v-else />
      </button>
      <h3 class="text-xl">
        Gentoo
      </h3>
      <badge />
    </div>

    <div class="flex justify-center items-center gap-x-2">
      <button class="toolbar-button-base play" disabled>
        <ph-play />
      </button>
      <button class="toolbar-button-base stop">
        <ph-stop />
      </button>
      <button class="toolbar-button-base delete">
        <ph-trash />
      </button>
    </div>
  </navbar>
</template>

<style scoped lang="css">
.toggle-sidebar-button {
  @apply p-1 rounded-full hover:bg-background_lighter duration-300 transition-colors;
}

.toolbar-button-base {
  @apply rounded-full p-1 transition-colors duration-300 cursor-pointer;
  @apply disabled:!text-white/20 disabled:hover:!bg-transparent disabled:!cursor-default;
}

.toolbar-button-base.play {
  @apply text-green hover:bg-green/10;
}

.toolbar-button-base.stop {
  @apply text-red hover:bg-red/10;
}

.toolbar-button-base.delete {
  @apply text-yellow hover:bg-yellow/10;
}
</style>
<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { PhPlay, PhStop, PhTrash, PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";

import { useSidebarState, useAppState, VMStatus, useVms } from "@/stores";
import Badge from "./Badge.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const sidebarState = useSidebarState();
const appState = useAppState();
const vmsStore = useVms();

const { showSidebar } = storeToRefs(sidebarState);
const { toggleSidebar } = sidebarState;

const { selectedVM, vmStatus } = storeToRefs(appState);
const { formatVMStatus } = appState;

const { fetchingVms } = storeToRefs(vmsStore);
const { startVM, stopVM, deleteVM } = vmsStore;

const stopCurrentVM = () => {
  stopVM({
    name: selectedVM.value!.name,
    savestate: confirm('Save stae?'),
  });
}

const removeCurrentVM = async () => {
  await deleteVM({
    name: selectedVM.value!.name,
    remove: confirm('Remove vm files?'),
  });

  router.push("/");
}

const showVMDetails = computed(() => selectedVM.value !== undefined);

const vmLabel = computed(() => {
  return selectedVM.value === undefined ? "VBox Manager" : selectedVM.value.name
});
</script>

<template>
  <nav class="w-full py-2 px-4 flex justify-between items-center border-b border-background_light">
    <div class="flex justify-center items-center gap-x-2">
      <button class="toggle-sidebar-button" @click="toggleSidebar">
        <ph-caret-left v-if="showSidebar" />
        <ph-caret-right v-else />
      </button>
      <h3 class="text-xl">
        {{ vmLabel }}
      </h3>
      <badge
        v-if="showVMDetails"
        :label="formatVMStatus(vmStatus!)"
        :status="vmStatus!"
      />
    </div>

    <div class="flex justify-center items-center gap-x-2" v-if="showVMDetails">
      <button
        class="toolbar-button-base play"
        :disabled="vmStatus! == VMStatus.running || fetchingVms"
        @click="startVM(selectedVM!.name)"
      >
        <ph-play />
      </button>
      <button
        class="toolbar-button-base stop"
        :disabled="vmStatus! == VMStatus.stopped || fetchingVms"
        @click="stopCurrentVM"
      >
        <ph-stop />
      </button>
      <button
        class="toolbar-button-base delete"
        :disabled="vmStatus! == VMStatus.running || fetchingVms"
        @click="removeCurrentVM"
      >
        <ph-trash />
      </button>
    </div>
  </nav>
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
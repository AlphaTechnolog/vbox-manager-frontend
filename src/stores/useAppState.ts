import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { VMStatus, type VM } from "./types.d";

export const useAppState = defineStore("appstate", () => {
  const selectedVM = ref<undefined | VM>(undefined);

  const vmStatus = computed<undefined | VMStatus>(() => {
    if (selectedVM.value === undefined) {
      return undefined;
    }

    const status = selectedVM.value.status;

    if (status.startsWith("powered off") || status.startsWith("saved")) {
      return VMStatus.stopped;
    }

    return VMStatus.running;
  });

  const formatVMStatus = (vmStatus: VMStatus): "Running" | "Stopped" => {
    return vmStatus === VMStatus.running ? "Running" : "Stopped";
  }

  return {
    selectedVM,
    vmStatus,
    formatVMStatus,
  };
});
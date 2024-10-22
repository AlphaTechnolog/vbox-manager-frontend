import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { isMobile } from "@/helpers";

export const useSidebarState = defineStore("sidebar-state", () => {
  const showSidebar = ref<boolean>(true);

  onMounted(() => {
    if (isMobile()) {
      showSidebar.value = false;
    }
  });

  const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
  }

  return {
    showSidebar,
    toggleSidebar,
  };
});
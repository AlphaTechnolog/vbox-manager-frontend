<script setup lang="ts">
import { onMounted } from "vue";
import { useVms, useSidebarState } from "@/stores";
import { storeToRefs } from "pinia";

const { showSidebar } = storeToRefs(useSidebarState());

const vmsStore = useVms();
const { fetchall } = vmsStore;
const { fetchingVms, vms } = storeToRefs(vmsStore);
</script>

<template>
  <aside class="bg-background_darker border-r border-background_light h-[100vh] text-left flex flex-col justify-start items-center overflow-hidden w-full md:w-[20%]" v-show="showSidebar">
    <div class="h-full overflow-auto p-2 w-full">
      <h3 class="text-lg font w-full text-dimmed_foreground mb-2">
        My Virtual Machines
      </h3>
  
      <ul class="vms-list" v-if="!fetchingVms">
        <router-link to="/vm/Gentoo" class="active">Gentoo</router-link>
        <router-link to="/vm/Arch">Arch</router-link>
      </ul>
    </div>
    <div class="border-t border-background_light w-full py-2 px-3 text-center">
      <p class="text-sm text-dimmed_foreground">
        Made by
        <a href="https://github.com/AlphaTechnolog" target="_blank" class="text-blue">
          AlphaTechnolog
        </a>
      </p>
    </div>
  </aside>
</template>

<style scoped lang="css">
ul.vms-list {
  @apply flex flex-col justify-center items-start w-full gap-y-1;
}

ul.vms-list a {
  @apply w-full py-2 px-3 rounded-lg text-sm duration-300 transition-colors cursor-pointer;
  @apply hover:bg-background_light;
}

ul.vms-list a.router-link-exact-active {
  @apply bg-background_light hover:!bg-background_lighter;
}
</style>
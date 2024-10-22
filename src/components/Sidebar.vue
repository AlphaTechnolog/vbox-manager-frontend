<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useVms, useSidebarState, type CreateVMPayload } from "@/stores";
import { storeToRefs } from "pinia";

import GenericModal from "./GenericModal.vue";
import { PhPlus } from "@phosphor-icons/vue";

const vmsStore = useVms();

const { showSidebar } = storeToRefs(useSidebarState());
const { fetchingVms, vms } = storeToRefs(vmsStore);
const { fetchall, createVM } = vmsStore;

const openCreateDialog = ref<boolean>(false);

const setIsCreateDialogOpened = (value: boolean): void => {
  openCreateDialog.value = value;
}

const handleCreateSubmit = async (e: SubmitEvent) => {
  e.preventDefault();
  
  const formData = new FormData(e.target as HTMLFormElement);

  const get = (x: string): string =>
    (formData.get(x) as string | null)!;

  await createVM({
    name: get("name"),
    ostype: get("ostype"),
    iso: get("iso"),
    basefolder: get("basefolder"),
    network_iface: get("network_iface"),
    memory: {
      size: Number(get("memory-size")),
      vram: Number(get("vram")),
    },
    disk: {
      path: get("disk-path"),
      size: Number(get("disk-size")),
    },
    rdp: {
      enabled: true, // TODO: Add way to disable this.
      vnc_passwd: get("vnc-passwd"),
    },
  } as CreateVMPayload);

  setIsCreateDialogOpened(false);
}

onMounted(() => {
  fetchall();
});
</script>

<template>
  <generic-modal
    :opened="openCreateDialog"
    :onClose="() => setIsCreateDialogOpened(false)"
    :onDone="() => handleCreateSubmit()"
  >
    <template #header>
      <h3 class="text-xl font-semibold text-foreground">
        Create virtual machine
      </h3>
    </template>

    <!-- TODO: Maybe we should use accordions -->
    <template #body>
      <form
        id="create-vm-form"
        class="flex flex-col justify-center items-center w-full h-full gap-y-2"
        @submit.prevent="handleCreateSubmit"
      >
        <input
          type="text"
          name="name"
          class="generic-input"
          placeholder="Enter name"
          required
        />

        <!-- TODO: Get a list of ostypes from backend -->
        <input
          type="text"
          name="ostype"
          class="generic-input"
          placeholder="Enter os type"
          required
        />

        <!-- TODO: Create a folder explorer (directories from backend) -->
        <input
          type="text"
          name="iso"
          class="generic-input"
          placeholder="Enter iso path"
          required
        />

        <input
          type="text"
          name="basefolder"
          class="generic-input"
          placeholder="Enter base folder"
          required
        />

        <input
          type="text"
          name="network_iface"
          class="generic-input"
          placeholder="Enter network interface to share with guest"
          required
        />

        <input
          type="number"
          name="memory-size"
          class="generic-input"
          placeholder="Enter memory size"
          required
        />

        <input
          type="number"
          name="vram"
          class="generic-input"
          placeholder="Enter vram size"
          required
        />

        <input
          type="text"
          name="disk-path"
          class="generic-input"
          placeholder="Enter disk path"
          required
        />

        <input
          type="number"
          name="disk-size"
          class="generic-input"
          placeholder="Enter disk size"
          required
        />

        <input
          type="text"
          name="vnc-passwd"
          class="generic-input"
          placeholder="Enter VNC server password"
          required
        />
      </form>
    </template>

    <template #footer="{ onClose }">
      <button
        type="button"
        class="footer-button-base dimmed"
        @click="onClose"
      >
        Close
      </button>

      <button
        type="submit"
        form="create-vm-form"
        class="footer-button-base success"
      >
        Done
      </button>
    </template>
  </generic-modal>

  <aside
    class="bg-background_darker border-r border-background_light h-[100vh] text-left flex flex-col justify-start items-center overflow-hidden w-full md:w-[20%]"
    v-show="showSidebar">
    <div class="h-full overflow-auto p-2 w-full">
      <router-link to="/" class="text-lg font w-full text-dimmed_foreground ">
        My Virtual Machines
      </router-link>

      <ul class="vms-list mt-2" v-if="!fetchingVms">
        <router-link class="capitalize" v-for="vm in vms" :key="vm.uuid" :to="`/vm/${vm.name}`">
          {{ vm.name }}
        </router-link>

        <button
          class="text-lg text-center w-full py-2 rounded-md border border-dotted border-background_lighter transition-colors duration-300 hover:bg-background_light"
          @click="setIsCreateDialogOpened(true)">
          <ph-plus class="w-full" />
        </button>
      </ul>

      <!-- TODO: Add skeleton -->
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
  @apply flex flex-col justify-center items-start w-full gap-y-2;
}

ul.vms-list a {
  @apply w-full py-2 px-3 rounded-lg text-sm duration-300 transition-colors cursor-pointer;
  @apply hover:bg-background_light;
}

ul.vms-list a.router-link-exact-active {
  @apply bg-background_light hover:!bg-background_lighter;
}

.generic-input {
  @apply w-full bg-background_light text-foreground border border-background_lighter;
  @apply rounded-md py-2 px-3 focus:ring-0 outline-none focus:border-black;
  @apply duration-300 transition-colors placeholder:text-background_lighter;
}
</style>
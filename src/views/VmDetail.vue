<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppState, useVms, VMStatus, type VM } from '@/stores';
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { PhSmileyWink } from "@phosphor-icons/vue";

const appState = useAppState();
const vmsStore = useVms();

const { selectedVM, vmStatus } = storeToRefs(appState);
const { vms } = storeToRefs(vmsStore);

const wssUrl = computed(() => {
  return `ws://${import.meta.env.VITE_SERVER_IP}:10001`;
});

const route = useRoute();

const handleOnRequiredCredentials = <T extends { sendCredentials: (x: Record<string, unknown>) => void },>(rfb: T) => {
  rfb.sendCredentials({
    password: prompt("Enter password"),
  });
}

onMounted(() => {
  if (vms.value.length > 0) {
    selectedVM.value = vms.value.find((vm: VM) => {
      return vm.name === route.params.name as string;
    });
  }
})
</script>

<template>
  <main :class="`flex flex-col gap-y-2 justify-center items-center ${vmStatus === VMStatus.stopped ? 'h-[80%]' : 'h-full'}`">
    <div v-if="vmStatus == VMStatus.stopped" class="text-dimmed_foreground flex flex-col justify-center items-center">
      <ph-smiley-wink size="150px" />
      <h3 class="text-xl">
        This
        <span class="text-blue">
          vm
        </span>
        seems to be
        <span class="text-red">
          stopped
        </span>
      </h3>
    </div>

    <div class="flex flex-col justify-center items-center text-dimmed_foreground" v-else>
      <vue-vnc
        :url="wssUrl"
        :onCredentialsRequired="handleOnRequiredCredentials"
        style="max-height: 80vh !important;"
        focusOnClick
      />
      <p>
        Connecting to
        <span class="text-green">
          {{ wssUrl }}
        </span>
      </p>
    </div>
  </main>
</template>
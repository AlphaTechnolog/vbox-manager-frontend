<script setup lang="ts">
import { VMStatus } from '@/stores';
import { computed } from 'vue';

interface Props {
  label: string;
  status: VMStatus;
}

const props = defineProps<Props>();

const extraClasses = computed<string>(() => {
  if (props.status == VMStatus.running) return "bg-green/20 text-green";
  else if (props.status == VMStatus.stopped) return "bg-red/20 text-red";
  return "";
});
</script>

<template>
  <div :class="`rounded-full py-1 px-3 text-center text-xs ${extraClasses}`">
    <p>{{ label }}</p>
  </div>
</template>
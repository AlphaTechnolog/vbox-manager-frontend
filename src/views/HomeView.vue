<script lang="ts" setup>
import { useVms } from '@/stores/useVms'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const store = useVms()
const { fetchall } = store
const { fetchingVms, vms } = storeToRefs(store)

onMounted(() => {
  fetchall()
})
</script>

<template>
  <div v-if="!fetchingVms">
    <div v-for="vm of vms" :key="vm.uuid">
      <p>{{ vm.name }}</p>
    </div>
  </div>
</template>

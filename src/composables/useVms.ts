import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/api/axios'

import type { VM } from './types'

export const useVms = defineStore('vms', () => {
  const vms = ref<VM[]>([])
  const fetchingVms = ref(false)

  const fetchall = async () => {
    fetchingVms.value = true

    // TODO Use proper error handling
    const fetchResult = await api
      .get<{ vbox_vms: VM[] }>('/list')
      .catch(err => {
        throw err
      })

    console.log(fetchResult.data)

    vms.value = fetchResult.data.vbox_vms
    fetchingVms.value = false
  }

  return {
    vms,
    fetchingVms,
    fetchall,
  }
})

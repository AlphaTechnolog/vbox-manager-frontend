import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { api } from '@/api/axios'
import { useAppState } from "@/stores";

import type { StartVMResponse, VM } from './types.d'

export const useVms = defineStore('vms', () => {
  const { selectedVM } = storeToRefs(useAppState());

  const vms = ref<VM[]>([])
  const fetchingVms = ref(false);

  // TODO Use proper error handling
  const handleErrors = (err: Error) => {
    throw err;
  }

  const fetchall = async () => {
    fetchingVms.value = true

    const fetchResult = await api
      .get<{ vbox_vms: VM[] }>('/list')
      .catch(handleErrors);

    vms.value = fetchResult.data.vbox_vms
    fetchingVms.value = false
  }

  const refreshAppStateVM = () => {
    if (selectedVM.value !== undefined) {
      selectedVM.value = vms.value.find((vm: VM) => {
        return vm.name === selectedVM.value!.name;
      });
    }
  }

  const startVM = async (name: string): Promise<void> => {
    fetchingVms.value = true;

    const fetchResult = await api.post<StartVMResponse>("/start", {
      name,
    }).catch(handleErrors);
    
    if (fetchResult.data.is_err) {
      return handleErrors(new Error(fetchResult.data.message));
    }
    
    // TODO: Dispatch message in a toast (fetchResult.data.message)

    await fetchall();

    // refresh selected vm
    refreshAppStateVM();
  }

  // TODO: Use better confirm implementation.
  const stopVM = async ({ name, savestate }: { name: string, savestate: boolean }): Promise<void> => {
    fetchingVms.value = true;

    type Response = {
      is_err: boolean;
      message?: string;
      payload: {
        stdout: string;
        stderr: string;
      };
    };

    const fetchResult = await api.post<Response>("/stop", {
      savestate,
      name,
    }).catch(handleErrors);

    if (fetchResult.data.is_err) {
      return handleErrors(new Error(fetchResult.data.message ?? "Unknown error happened"));
    }

    await fetchall();

    refreshAppStateVM();
  }
  
  const deleteVM = async ({ name, remove }: { name: string, remove: boolean }): Promise<void> => {
    fetchingVms.value = true;

    type Response = {
      is_err: boolean;
      message?: string;
      payload: {
        stdout: string;
        stderr: string;
      };
    };

    const fetchResult = await api.delete<Response>("/unregistervm", {
      params: {
        name,
        delete: remove ? "yes" : "no",
      },
    }).catch(handleErrors);

    if (fetchResult.data.is_err) {
      return handleErrors(new Error(fetchResult.data.message || "Unknown error happened"));
    }

    await fetchall();

    refreshAppStateVM();
  }

  return {
    vms,
    fetchingVms,
    fetchall,
    startVM,
    stopVM,
    deleteVM,
  }
})

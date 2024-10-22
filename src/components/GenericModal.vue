<script setup lang="ts">
import { PhX } from "@phosphor-icons/vue";

interface Props {
  opened?: boolean;
  onClose?: () => void;
  onDone?: () => void;
}

const {
  opened,
  onClose,
  onDone,
} = defineProps<Props>();
</script>

<template>
  <div
    tabindex="-1"
    :class="`generic-modal-container overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex ${opened ? '' : 'hidden'}`"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative rounded-lg shadow bg-background_light">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-background_lighter">
          <slot name="header">
            <h3 class="text-xl font-semibold text-foreground">
              Terms of Service
            </h3>
          </slot>
          <button
            type="button"
            class="text-dimmed_foreground bg-transparent hover:bg-background_lighter/10 border border-transparent hover:border-background_lighter rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center duration-300 transition-colors"
            @click="onClose"
          >
            <ph-x size="18px" />
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <slot name="body">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
              to ensure a common set of data rights in the European Union. It requires organizations to notify users as
              soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </slot>
        </div>
        <div class="flex justify-end items-center gap-x-1 p-4 md:p-5 border-t rounded-b border-background_lighter">
          <slot
            name="footer"
            :onClose="onClose"
            :onDone="onDone"
          >
            <button
              type="button"
              class="footer-button-base dimmed"
              @click="onClose"
            >
              Close
            </button>
            <button
              type="button"
              class="footer-button-base success"
              @click="onDone"
            >
              Create
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.generic-modal-container button.footer-button-base {
  @apply transition-colors duration-300 border-transparent;
  @apply border border-solid py-2 px-4;
  @apply rounded-md text-sm capitalize;
}

.generic-modal-container button.footer-button-base.dimmed {
  @apply text-dimmed_foreground hover:bg-background_lighter/20 hover:border-black;
}

.generic-modal-container button.footer-button-base.success {
  @apply text-green hover:bg-green/20 hover:border-green hover:text-green;
}
</style>
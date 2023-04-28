<script setup lang="tsx">
import { DialogTitle } from '@headlessui/vue'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useCheckoutStore } from '~/stores/checkout';

const checkoutStore = useCheckoutStore()
const { checkoutHasError, checkoutPaymentResponse } = storeToRefs(checkoutStore)
</script>

<template>
  <div class="sm:flex items-start">
    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
      <InformationCircleIcon class="h-6 w-6 text-yellow-500" aria-hidden="true" />
    </div>
    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 mb-2">API response dump</DialogTitle>
      <div class="whitespace-pre bg-gray-200 p-4 rounded-md">{{ checkoutPaymentResponse }}</div>
    </div>
  </div>
</template>

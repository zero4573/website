<script setup lang="tsx">
import { DialogTitle } from '@headlessui/vue'
import { ExclamationTriangleIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { useCheckoutStore } from '~/stores/checkout';

const checkoutStore = useCheckoutStore()
const { checkoutShowModal, checkoutHasError } = storeToRefs(checkoutStore)
</script>

<template>
  <div class="bg-white px-4 pb-4 pt-5">
    <div class="flex items-start justify-center items-center">
      <div
        class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
        :class="checkoutHasError ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'">
        <ExclamationTriangleIcon v-if="checkoutHasError" class="h-6 w-6" />
        <CheckIcon v-else class="h-6 w-6" />
      </div>
      <div>
        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
          <span v-if="checkoutHasError" class="text-red-500 whitespace-pre col-span-6 p-4 mt-8">Purchase Failed!</span>
          <span v-else class="text-green-500 whitespace-pre col-span-6 p-4 mt-8">Purchase Completed!</span>
        </DialogTitle>
      </div>
    </div>
  </div>
</template>

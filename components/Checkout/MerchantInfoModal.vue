<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { InformationCircleIcon } from '@heroicons/vue/24/solid'

const open = ref(false)

function toggleModal() {
  open.value = !open.value
}
</script>

<template>
  <button class="ml-1 rounded-full" v-on:click="toggleModal">
    <InformationCircleIcon class="h-6 w-6 text-blue-600" />
  </button>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-yellow-500" aria-hidden="true" />
                  </div>
                  <div class="mt-3 sm:ml-4 sm:mt-0 text-left">
                    <DialogTitle as="h3" class="text-center sm:text-left text-base font-semibold leading-6 text-gray-900">Server side request</DialogTitle>
                    <div class="mt-2">
                      <p class="mb-2">
                        The token retrieved in the previous section should be sent to a server, which will use the merchant id/passcode to complete the transaction using
                        the <a class="text-blue-500" target="_blank" href="https://dev.na.bambora.com/docs/references/payment_APIs/">Bambora Payment API</a>
                      </p>
                      <p class="mb-2">
                        For the purposes of this demo, this section can be used to simulate the server-side request, on the client side.
                        This should NOT be done in production as it will expose your merchant id/passcode.
                      </p>
                    </div>
                  </div>
              </div>
            </div>
            <div class="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button"
                class="flex items-center rounded bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                v-on:click="toggleModal">Close</button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </div>
  </Dialog>
</TransitionRoot></template>
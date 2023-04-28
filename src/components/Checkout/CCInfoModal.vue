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
  <button class="ml-1 rounded-full" v-on:click="toggleModal"><InformationCircleIcon class="h-6 w-6 text-blue-600"/></button>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-yellow-500" aria-hidden="true" />
                  </div>
                  <div class="mt-3 sm:ml-4 sm:mt-0 text-left">
                    <DialogTitle as="h3" class="text-base text-center sm:text-left font-semibold leading-6 text-gray-900">For demonstration purposes only</DialogTitle>
                    <div class="mt-2">
                      <p class="mb-2">
                        This checkout page uses the <a class="text-blue-500" target="_blank" href="https://dev.na.bambora.com/docs/guides/custom_checkout/">Bambora's
                          Custom Checkout library</a> to customize the checkout form.
                      </p>
                      <p class="mb-2">To continue, you can use the test card:</p>
                        <ul class="list-disc ml-8 my-2">
                          <li>card #: 4030 0000 1000 1234</li>
                          <li>code: 123</li>
                          <li>expiry: 12/99 <span class="text-gray-400">(any date in the future)</span></li>
                        </ul>
                      <p class="my-2">For a more comprehensive list of test cards, <a class="text-blue-500" target="_blank" href="https://dev.na.bambora.com/docs/references/payment_APIs/test_cards/">see the Bambora test cards page</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="flex items-center rounded bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white" v-on:click="toggleModal">Close</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
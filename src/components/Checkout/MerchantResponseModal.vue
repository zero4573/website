<script setup lang="tsx">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { useCheckoutStore } from '~/stores/checkout';
import MerchantResponseTabSummary from './MerchantResponseTabSummary.vue';
import MerchantResponseTabInfo from './MerchantResponseTabInfo.vue';

const open = ref(false)

const checkoutStore = useCheckoutStore()
const { checkoutShowModal } = storeToRefs(checkoutStore)

const tabs = {
  Summary: {
    Content: MerchantResponseTabSummary,
  },
  Info: {
    Content: MerchantResponseTabInfo,
  }
}
</script>

<template>
  <TransitionRoot as="template" :show="checkoutShowModal">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 translate-y-0 scale-95" enter-to="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 scale-100"
            leave-to="opacity-0 translate-y-4 translate-y-0 scale-95">
            <DialogPanel class="relative transform overflow-scroll rounded-lg bg-white text-left shadow-xl transition-all my-8 max-w-5xl">
              <TabGroup>
                <TabList class="flex space-x-1 bg-gray-100 p-1">
                  <Tab v-for="tabName in Object.keys(tabs)" as="template" :key="tabName" v-slot="{ selected }">
                    <button
                      class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white"
                      :class="selected ? 'bg-white shadow': 'text-blue-100'">
                      {{ tabName }}
                    </button>
                  </Tab>
                </TabList>
                <TabPanels class="mt-2">
                  <TabPanel v-for="(tabData, idx) in Object.values(tabs)" :key="idx" class="p-3">
                    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <component :is="tabData.Content" />
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                  class="flex items-center rounded bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                  v-on:click="checkoutStore.toggleCheckoutModal">Close</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
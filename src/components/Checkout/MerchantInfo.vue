<script setup lang="ts">
import { useScriptTag } from '@vueuse/core'
import { useCheckoutStore } from '~/stores/checkout';
import { useGlobalStore } from '~/stores/global';

const checkoutStore = useCheckoutStore()
const globalStore = useGlobalStore()

const merchantId = ref(undefined)
const merchantPasscode = ref(undefined)

const hasError = ref(false)
const paymentResponse = ref(undefined)

const tokenizedCard = computed(() => {
  return checkoutStore.tokenizedCard
})

async function submitCCToken() {
  const id = merchantId.value;
  const passcode = merchantPasscode.value;
  const base64EncodedPasscode = window.btoa(`${id}:${passcode}`);

  console.log("submitCCToken()");

  const body = {
    payment_method: 'token',
    amount: checkoutStore.totalBillable,
  }

  globalStore.setIsLoading(true)
  const response = await fetch('https://api.na.bambora.com/v1/payments', {
    method: 'POST',
    cache: "no-cache",
    headers: {
      'Authorization': `Passcode ${base64EncodedPasscode}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();
  if (response.status === 200) {
    hasError.value = false
    paymentResponse.value = json
  } else {
    hasError.value = true
    paymentResponse.value = json
  }
  globalStore.setIsLoading(false)
}

</script>

<template>
  <div class="mb-4 items-center">
    <h3 class="flex items-center text-base font-semibold leading-7 text-gray-900">Merchant Information
      <CheckoutMerchantInfoModal />
    </h3>
  </div>

  <div class="grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-6">
    <div class="col-span-6">
      <label for="cc-token" class="block text-sm font-medium leading-6 text-gray-900">CC Token</label>
      <div class="mt-2">
        <input type="text" id="cc-token" :value="tokenizedCard" disabled
          class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6" />
        </div>
      </div>

    <div class="col-span-6">
      <label for="merchant-id" class="block text-sm font-medium leading-6 text-gray-900">Merchant Id</label>
      <div class="mt-2">
        <input type="text" id="merchant-id" v-model="merchantId"
          class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6" />
      </div>
    </div>

    <div class="col-span-6">
      <label for="merchant-passcode" class="block text-sm font-medium leading-6 text-gray-900">Merchant Passcode</label>
      <div class="mt-2">
        <input type="text" id="merchant-passcode" v-model="merchantPasscode"
          class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6" />
      </div>
    </div>

    <div class="col-span-6">
      <button type="button"
        class="flex items-center rounded bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
        :disabled="!tokenizedCard"
        v-on:click="submitCCToken">
        Complete Purchase
      </button>
    </div>
  </div>

  <div v-if="paymentResponse"
    :class="hasError ? 'text-red-500' : 'text-green-500'"
    class="whitespace-pre col-span-6 bg-gray-200 p-4 mt-8 rounded-md"
  >{{ paymentResponse }}</div>

</template>

<style scoped></style>

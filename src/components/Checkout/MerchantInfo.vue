<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout';
import { useGlobalStore } from '~/stores/global';

const checkoutStore = useCheckoutStore()
const globalStore = useGlobalStore()

const {
  checkoutHasError,
  checkoutPaymentResponse,
  checkoutShowModal,
  tokenizedCard,
  cardHolderFullName
} = storeToRefs(checkoutStore)
const { isLoading } = storeToRefs(globalStore)

const merchantId = ref(undefined)
const merchantPasscode = ref(undefined)

async function submitCCToken() {
  isLoading.value = true

  const id = merchantId.value;
  const passcode = merchantPasscode.value;
  const base64EncodedPasscode = window.btoa(`${id}:${passcode}`);

  console.log("submitCCToken()");

  const body = {
    amount: checkoutStore.totalBillable,
    payment_method: 'token',
    token: {
      name: cardHolderFullName.value,
      code: tokenizedCard.value,
      complete: true,
    }
  }

  console.log(`cardholder name: ${cardHolderFullName.value}`)
  console.log(`tokenized card: ${tokenizedCard.value}`)
  console.log(`encoded passcode: ${base64EncodedPasscode}`)

  fetch('https://api.na.bambora.com/v1/payments', {
    method: 'POST',
    cache: "no-cache",
    headers: {
      'Authorization': `Passcode ${base64EncodedPasscode}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(async (response) => {
    const json = await response.json();
    if (response.status === 200) {
      checkoutHasError.value = false
      checkoutPaymentResponse.value = json
    } else {
      checkoutHasError.value = true
      checkoutPaymentResponse.value = json
    }
  }).catch((e) => {
    console.log(`failed to make payment request: ${e}`)
    checkoutHasError.value = true
    checkoutPaymentResponse.value = e
  }).finally(() => {
    isLoading.value = false
    checkoutShowModal.value = true
  });
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
        <input style="outline: none;" type="text" id="cc-token" :value="checkoutStore.tokenizedCard" disabled
          class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-6" />
        </div>
      </div>

    <div class="col-span-6">
      <label for="merchant-id" class="block text-sm font-medium leading-6 text-gray-900">Merchant Id</label>
      <div class="mt-2">
        <input style="outline: none;" type="text" id="merchant-id" v-model="merchantId"
          class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-6" />
      </div>
    </div>

    <div class="col-span-6">
      <label for="merchant-passcode" class="block text-sm font-medium leading-6 text-gray-900">Merchant Passcode</label>
      <div class="mt-2">
        <input style="outline: none;" type="text" id="merchant-passcode" v-model="merchantPasscode"
          class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-6" />
      </div>
    </div>

    <div class="col-span-6">
      <button type="button"
        class="flex items-center rounded bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
        :disabled="!checkoutStore.tokenizedCard"
        v-on:click="submitCCToken">
        Complete Purchase
      </button>
    </div>
  </div>
</template>

<style scoped></style>

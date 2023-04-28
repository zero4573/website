<script setup>
import { useScriptTag } from '@vueuse/core'
import { useCheckoutStore } from '~/stores/checkout';
import { useGlobalStore } from '~/stores/global';

const checkoutStore = useCheckoutStore()
const globalStore = useGlobalStore()

const cardNumberError = ref(undefined);
const isCardNumberComplete = ref(false);

const cvvError = ref(undefined);
const isCVVComplete = ref(false);

const expiryError = ref(undefined);
const isExpiryComplete = ref(false);

const tokenizationError = ref(undefined);

const cardBrandSVG = ref(undefined);

const customCheckoutController = ref(undefined);
useScriptTag('https://libs.na.bambora.com/customcheckout/1/customcheckout.js', () => {
  customCheckoutController.value = useBambora({
    isCardNumberComplete, cardNumberError,
    isCVVComplete, cvvError,
    isExpiryComplete, expiryError,
    setTokenizedCard: checkoutStore.setTokenizedCard, tokenizationError,
    cardBrandSVG,
    setIsLoading: globalStore.setIsLoading,
  });
});

</script>

<template>
  <div>
    <div class="mb-4 items-center">
      <h3 class="flex items-center text-base font-semibold leading-7 text-gray-900">Credit Card Information <CheckoutCCInfoModal /></h3>
    </div>
    <div class="grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-6">
      <div class="col-span-6">
        <label for="card-number" class="block text-sm font-medium leading-6 text-gray-900">Card Number</label>
        <div class="mt-2">
          <div id="card-number"
            class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6">
          </div>
          <p v-if="cardNumberError" class="text-red-500 text-xs italic">{{ cardNumberError }}</p>
        </div>
      </div>

      <div class="col-span-3">
        <label for="card-cvv" class="block text-sm font-medium leading-6 text-gray-900">CVV</label>
        <div class="mt-2">
          <div name="card-cvv" id="card-cvv"
            class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6">
          </div>
          <p v-if="cvvError" class="text-red-500 text-xs italic">{{ cvvError }}</p>
        </div>
      </div>

      <div class="col-span-3">
        <label for="card-expiry" class="block text-sm font-medium leading-6 text-gray-900">Expiry</label>
        <div class="mt-2">
          <div id="card-expiry"
            class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6">
          </div>
          <p v-if="expiryError" class="text-red-500 text-xs italic">{{ expiryError }}</p>
        </div>
      </div>

      <div v-if="tokenizationError" class="col-span-6">
        <p class="text-red-500 text-xs italic">{{ tokenizationError }}</p>
      </div>

      <div class="col-span-6">
        <button type="button"
          class="flex items-center rounded bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
          :disabled="!customCheckoutController || !isCardNumberComplete || !isCVVComplete || !isExpiryComplete"
          v-on:click="customCheckoutController.onSubmit"
        >
          <svg v-if="cardBrandSVG !== undefined" viewBox="0 0 30 24" class="mr-3 h-5 w-5">
            <image :xlink:href="cardBrandSVG" width="30" height="24" />
          </svg>
          Pay
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

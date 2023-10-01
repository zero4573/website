<script setup lang="ts">
import { useScriptTag } from '@vueuse/core'
import { useCheckoutStore } from '~/stores/checkout';
import { useGlobalStore } from '~/stores/global';

const emptyCardHolderNameErrorMsg = "Name cannot be empty"

const checkoutStore = useCheckoutStore()
const globalStore = useGlobalStore()

const { isLoading } = storeToRefs(globalStore)
const { cardHolderFullName, tokenizedCard } = storeToRefs(checkoutStore)

const cardNumberError = ref(undefined);
const isCardNumberComplete = ref(false);

const cvvError = ref(undefined);
const isCVVComplete = ref(false);

const expiryError = ref(undefined);
const isExpiryComplete = ref(false);

const tokenizationError = ref<undefined | string>(undefined);
const cardBrandSVG = ref(undefined);

const customCheckoutController = ref<any>(undefined);
useScriptTag('https://libs.na.bambora.com/customcheckout/1/customcheckout.js', () => {
  // @ts-ignore
  customCheckoutController.value = useBambora({
    isCardNumberComplete, cardNumberError,
    isCVVComplete, cvvError,
    isExpiryComplete, expiryError,
    cardBrandSVG,
  });
});

const cardHolderNameError = ref<undefined | string>(undefined);
const isCardHolderNameComplete = ref(false);
function checkCardHolderName() {
  if (cardHolderFullName.value && cardHolderFullName.value !== "") {
    cardHolderNameError.value = undefined;
    isCardHolderNameComplete.value = true;
  } else {
    cardHolderNameError.value = emptyCardHolderNameErrorMsg;
    isCardHolderNameComplete.value = false;
  }
}

function onSubmit() {
  if (!cardHolderFullName.value || cardHolderFullName.value === "") {
    isCardHolderNameComplete.value = true;
    cardHolderNameError.value = emptyCardHolderNameErrorMsg;
  }

  isLoading.value = true;
  tokenizedCard.value = undefined;
  tokenizationError.value = undefined;
  customCheckoutController.value?.onSubmit((result: any) => {

    if (result.error) {
      tokenizationError.value = `Error creating token: ${JSON.stringify(result.error, null, 4)}`
    } else {
      tokenizedCard.value = result.token;
    }

    isLoading.value = false;
  });

}

</script>

<template>
  <div>
    <div class="mb-4 items-center">
      <h3 class="flex items-center text-base font-semibold leading-7 text-gray-900">Credit Card Information <CheckoutCCInfoModal /></h3>
    </div>
    <div class="grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-6">
      <div class="col-span-6">
        <label for="fullname" class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
        <div class="mt-2">
          <input style="outline: none;" type="text" id="fullname" v-model="cardHolderFullName"
            v-on:blur="checkCardHolderName"
            @input="checkCardHolderName"
            class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-6" />
          <p v-if="cardHolderNameError" class="text-red-500 text-xs italic">{{ cardHolderNameError }}</p>
        </div>
      </div>

      <div class="col-span-6">
        <label for="card-number" class="block text-sm font-medium leading-6 text-gray-900">Card Number</label>
        <div class="mt-2">
          <div id="card-number"
            class="h-9 px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-6">
          </div>
          <p v-if="cardNumberError" class="text-red-500 text-xs italic">{{ cardNumberError }}</p>
        </div>
      </div>

      <div class="col-span-3">
        <label for="card-cvv" class="block text-sm font-medium leading-6 text-gray-900">CVV</label>
        <div class="mt-2">
          <div name="card-cvv" id="card-cvv"
            class="h-9 px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-6">
          </div>
          <p v-if="cvvError" class="text-red-500 text-xs italic">{{ cvvError }}</p>
        </div>
      </div>

      <div class="col-span-3">
        <label for="card-expiry" class="block text-sm font-medium leading-6 text-gray-900">Expiry</label>
        <div class="mt-2">
          <div id="card-expiry"
            class="h-9 px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-6 items-center">
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
          :disabled="!customCheckoutController || !isCardHolderNameComplete || !isCardNumberComplete || !isCVVComplete || !isExpiryComplete"
          v-on:click="onSubmit"
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

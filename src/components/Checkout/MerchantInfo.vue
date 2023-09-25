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
  cardHolderFullName,
  
  has3ds,
  merchantId,
  merchantPasscode,
} = storeToRefs(checkoutStore)
const { isLoading } = storeToRefs(globalStore)

async function submitCCToken() {
  isLoading.value = true
  const base64EncodedPasscode = window.btoa(`${merchantId.value}:${merchantPasscode.value}`)

  console.log("submitCCToken()")

  let secure3ds = null
  if (has3ds) {
    secure3ds = {
      "browser": {
        "accept_header": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        "java_enabled": navigator.javaEnabled(),
        "language": navigator.language,
        "color_depth": screen.colorDepth,
        "screen_height": screen.height,
        "screen_width": screen.width,
        "time_zone": new Date().getTimezoneOffset(),
        "user_agent": navigator.userAgent,
        "javascript_enabled": true,
      },
      "enabled": true,
      "version": 2,
      "auth_required": false
    }
  }

  let ip = null
  try {
    const ipResp = await fetch('https://api.ipify.org?format=json')
    if (ipResp.status !== 200) {
      console.log(`failed to retrieve client's ip, repsonse: ${ipResp}`)
      checkoutHasError.value = true
      checkoutPaymentResponse.value = `${ipResp}`
      return
    }

    const jsonResp = await ipResp.json()
    ip = jsonResp.ip
  } catch (e) {
    console.log(`failed to retrieve client's ip: ${e}`)
    checkoutHasError.value = true
    checkoutPaymentResponse.value = `${e}`
    return
  }

  const body = {
    amount: checkoutStore.totalBillable,
    payment_method: 'token',
    token: {
      name: cardHolderFullName.value,
      code: tokenizedCard.value,
      complete: true,
      "customer_ip": ip,
      "3d_secure": secure3ds,
    }
  }

  console.log(body)
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

    <div class="col-span-3">
      <label class="block text-sm font-medium leading-6 text-gray-900 relative flex justify-between items-center group">
        Enable 3ds?
        <input type="checkbox" class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
          v-model="has3ds" />
        <span
          class="w-14 h-8 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-blue-600 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
      </label>
    </div>

    <div class="col-span-6">
      <button type="button"
        class="flex items-center rounded bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
        :disabled="!checkoutStore.tokenizedCard" v-on:click="submitCCToken">
        Complete Purchase
      </button>
    </div>
  </div>
</template>

<style scoped></style>

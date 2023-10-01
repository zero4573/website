<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout';
import { useGlobalStore } from '~/stores/global';

const checkoutStore = useCheckoutStore()
const globalStore = useGlobalStore()
const config = useAppConfig();

const route = useRoute()
const continueUrl = window.localStorage.getItem("3ds_url")
const processorInfo = parseQuery(route.query.body);

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
      throw new Error(`repsonse: ${ipResp}`)
    }

    const jsonResp = await ipResp.json()
    ip = jsonResp.ip
  } catch (e) {
    console.log(`failed to retrieve client's ip: ${e}`)
    checkoutHasError.value = true
    checkoutPaymentResponse.value = `${e}`
    isLoading.value = false
    checkoutShowModal.value = true
    return
  }

  const redirectUrl = encodeURIComponent(`${window.location.origin}${window.location.pathname}`)
  const body = {
    amount: checkoutStore.totalBillable,
    payment_method: 'token',
    customer_ip: ip,
    term_url: `${config.redirectURL}?redirectUrl=${redirectUrl}`,
    token: {
      name: cardHolderFullName.value,
      code: tokenizedCard.value,
      complete: true,
      "3d_secure": secure3ds,
    }
  }

  try {
    const resp = await fetch('https://api.na.bambora.com/v1/payments', {
    method: 'POST',
    cache: "no-cache",
    headers: {
      'Authorization': `Passcode ${base64EncodedPasscode}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    })
    
    const json = await resp.json()
    if (resp.status === 200) {
      // frictionless
      checkoutHasError.value = false
      checkoutPaymentResponse.value = json
      isLoading.value = false
      checkoutShowModal.value = true
      return
    } if (resp.status === 302) {
      // 3ds challenge
      const link = json.links.find((link: any) => link.rel === "continue")
      window.localStorage.setItem("3ds_url", link.href)

      const placeholder = document.getElementById("3ds-placeholder")
      if (placeholder) {
        placeholder.innerHTML = decodeURIComponent(json.contents).replaceAll('+', ' ')
        // @ts-ignore
        document.getElementById('challengeform').submit();
        return
      }

      checkoutHasError.value = false
      checkoutPaymentResponse.value = json
      isLoading.value = false
      checkoutShowModal.value = true
      throw new Error("Missing 3ds-placeholder element")
    } 
    
    // all others are failures
    checkoutHasError.value = true
    checkoutPaymentResponse.value = json
    isLoading.value = false
    checkoutShowModal.value = true
  } catch (e) {
    console.log(`failed to make payment request: ${e}`)
    checkoutHasError.value = true
    checkoutPaymentResponse.value = `${e}`
  }
}

async function processCallback() {
  isLoading.value = true;
  const continueUrl = window.localStorage.getItem("3ds_url")

  try {
    if (!continueUrl) {
      throw new Error("Missing 3ds_url in local storage");
    }

    if (!processorInfo) {
      throw new Error("No callback information detected, this should never happen unless you are calling processCallback standalone without a check for processorInfo");
    }

    const cres = processorInfo.cres;
    if (!cres) {
      throw new Error("Payment processor missing cres on return");
    }

    const reqBody = {
      "payment_method": "credit_card", 
      "card_response": {
        "cres": cres
      }
    }

    const base64EncodedPasscode = window.btoa(`${merchantId.value}:${merchantPasscode.value}`)
    const resp = await fetch(continueUrl, {
      method: 'POST',
      cache: "no-cache",
      headers: {
        'Authorization': `Passcode ${base64EncodedPasscode}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })

    if (!resp.ok) {
      const body = await resp.text(); 
      throw new Error(`Failed continue call with error code: ${resp.status}\nBody: ${body}`);
    } 
    
    checkoutPaymentResponse.value = await resp.json();
    checkoutHasError.value = false
  } catch(e) {
    checkoutHasError.value = true
    checkoutPaymentResponse.value = ((<Error>e).message)
    } finally {
      isLoading.value = false;
      checkoutShowModal.value = true
  }
}

if (processorInfo !== undefined) {
  processCallback()
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
    <div id="3ds-placeholder"></div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { useCheckoutStore } from '../../stores/checkout'

definePageMeta({
  layout: "shop",
})

const checkoutStore = useCheckoutStore()
const { checkoutHasError, checkoutPaymentResponse, checkoutShowModal, cardHolderFullName, tokenizedCard } = storeToRefs(checkoutStore)

onUnmounted(() => {
  checkoutHasError.value = false
  checkoutShowModal.value = false
  cardHolderFullName.value = undefined
  checkoutPaymentResponse.value = undefined
  tokenizedCard.value = undefined
})
</script>

<template>
  <Head>
    <Title>Cart - Consultant Demo Shop</Title>
  </Head>

  <CheckoutMerchantResponseModal />
  <div class="grid grid-cols-1 lg:grid-cols-3 pt-4">
    <div class="flex justify-center lg:col-span-1 mb-10">
      <div class="w-96">
        <div class="flex justify-between border-b p-2 font-medium bg-gray-100 items-center ">
          <div class="w-1/3">Product</div>
          <div class="w-1/3 text-center">Quantity</div>
          <div class="w-1/3">Sub total</div>
        </div>
        <div class="flex justify-between border-b p-2 font-normal" v-for="item in checkoutStore.items" :key="item.productId">
          <div class="w-1/3">{{ item.productName }}</div>
          <div class="w-1/3 text-center">{{ item.quantity }}</div>
          <div class="w-1/3">${{ item.subTotal.toFixed(2).toLocaleString() }}</div>
        </div>
        <div class="flex justify-between border-b p-2 font-normal bg-gray-100">
          <div class="w-2/3">Total</div>
          <div class="w-1/3">${{ checkoutStore.totalBillable }}</div>
        </div>
      </div>
    </div>

    <div class="w-full lg:col-span-2 lg:row-start-1 flex justify-center">
      <div class="w-96">
        <CheckoutCCInputs></CheckoutCCInputs>
        <hr class="my-10" />
        <CheckoutMerchantInfo></CheckoutMerchantInfo>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
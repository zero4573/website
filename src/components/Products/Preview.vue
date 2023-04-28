<script setup lang="ts">
import { useCheckoutStore, CartItemData } from '../../stores/checkout';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const image = useAssets(`/assets/images/products/${props.product.image}`);

const itemPayload: CartItemData = {
  productId: props.product.id,
  productName: props.product.name,
  price: props.product.price,
};

const checkoutStore = useCheckoutStore()
function increment() {
  checkoutStore.addToCart(itemPayload);
}

function decrement() {
  checkoutStore.removeFromCart(itemPayload);
}

const count = computed(() => {
  if (checkoutStore.items[itemPayload.productId]) {
    return checkoutStore.items[itemPayload.productId].quantity
  }
  return 0
});

</script>

<template>
  <div>
    <div class="max-w-sm bg-white rounded-lg border border-indigo-200 shadow-md dark:bg-gray-800 ">
      <div>
        <img class="rounded-t-lg h-80 w-96 object-cover hover:animate-pulse" :src="image"
          :alt="`${product.name}'s image`">
      </div>
      <div class="p-5">
        <div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-indigo-600 dark:text-white">
            {{ product.name }}
          </h5>
        </div>
        <div class="flex mb-3 items-center">
          <p class="w-1/2 font-medium text-indigo-700 dark:text-gray-400">
            ${{ product.price }}
          </p>
          <div class="w-1/2 items-center">
            <div class="custom-number-input h-10 w-32">
              <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button v-on:click="decrement"
                  class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-l cursor-pointer outline-none">
                  <svg class="w-6 h-6 ml-1" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"></path>
                  </svg>
                </button>
                <input type="number" :value="count" disabled
                  class="outline-none focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" />
                <button v-on:click="increment"
                  class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-r cursor-pointer">
                  <svg class="w-6 h-6 ml-1" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}</style>
<script setup lang="ts">
import { useProductsStore } from '../../stores/products'

definePageMeta({
  layout: "shop",
})

const productsStore = useProductsStore()
</script>

<template>
  <div class="flex justify-around" v-if="productsStore.products">
    <div v-for="product in productsStore.products" :key="product.id">
      <ProductsPreview :product="product" />
    </div>
  </div>
</template>

<style scoped></style>
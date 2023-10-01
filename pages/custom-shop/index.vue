<script setup lang="ts">
import { useProductsStore } from '../../stores/products'

definePageMeta({
  layout: "shop",
})

const productsStore = useProductsStore()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-if="productsStore.products"
      v-for="product in productsStore.products"
      :key="product.id"
    >
      <ProductsPreview :product="product" />
    </div>
  </div>
</template>

<style scoped></style>
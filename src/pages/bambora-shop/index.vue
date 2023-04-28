<script setup lang="ts">
import { useProductsStore } from '../../stores/products'

definePageMeta({
  layout: "bambora",
});

const productsStore = useProductsStore()

const products = computed(() => {
  return productsStore.products
})

</script>

<template>
  <div class="flex justify-around" v-if="products">
    <div v-for="product in products" :key="product.id">
      <ProductsPreview :product="product" />
    </div>
  </div>
</template>

<style scoped></style>
<script setup>
import { useProductsStore } from '../stores/products'
import { useGlobalStore } from '../stores/global'

const productsStore = useProductsStore();
async function retrieveProducts() {
  await productsStore.retrieveProducts();
}

const globalStore = useGlobalStore();

await retrieveProducts()
</script>
<template>
  <Head>
    <Title>Bambora Demo Shop</Title>
  </Head>
  <div class="min-h-screen" :class="{dark: globalStore.isDarkTheme }">
    <GlobalLoading />
    <header>
      <div class="flex justify-between w-screen h-16 px-10 items-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
        <NuxtLink to="/bambora-shop">Bambora Demo Shop</NuxtLink>
        <ShoppingCartLink />
      </div>
    </header>
    <main class="p-10 mb-10">
      <slot></slot>
    </main>
    <footer class="fixed bottom-0 text-center w-full p-2 text-xs py-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      &copy; Bambora Demo Shop - 2022
    </footer>
  </div>
</template>

<style scoped></style>
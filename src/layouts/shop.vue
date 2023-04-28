<script setup>
import { useGlobalStore } from '../stores/global'

const globalStore = useGlobalStore();
</script>
<template>
  <Head>
    <Title>Consultant Demo Shop</Title>
  </Head>
  <div class="min-h-screen" :class="{dark: globalStore.isDarkTheme }">
    <GlobalLoading />
    <header>
      <div class="flex justify-between w-screen h-16 px-10 items-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
        <NuxtLink to="/custom-shop">Consultant Demo Shop</NuxtLink>
        <ShoppingCartLink />
      </div>
    </header>
    <main class="p-10 mb-10">
      <slot></slot>
    </main>
    <footer class="fixed bottom-0 text-center w-full p-2 text-xs py-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      &copy; Consultant Demo Shop - 2023
    </footer>
  </div>
</template>

<style scoped></style>
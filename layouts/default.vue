<script setup lang="ts"></script>
<template>
  <Head>
    <Title>Andy's Bio</Title>
  </Head>
  <div class="min-h-screen">
    <header>
      <div class="flex w-screen bg-gray-100 h-16 px-4 text-gray-800 items-center justify-between">
        <NuxtLink to="/">Andy's Bio</NuxtLink>
        <ThemePicker />
      </div>
    </header>
    <main class="p-4">
      <slot />
    </main>
    <footer class="fixed bottom-0 text-center w-full text-gray-700 p-2 text-xs z-10 bg-white py-4 border-t">
      &copy; Andy To - 2022
    </footer>
  </div>
</template>

<style scoped></style>

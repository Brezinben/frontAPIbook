<template>
  <main>
    <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">{{ $route.meta.title }}</h1>
      </div>
    </header>

    <div v-if="$store.state.error" class="relative py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100 "
         role="alert">
      <p class="font-bold">Be Warned</p>
      <p>{{ $store.state.error }}</p>

      <span @click="$store.state.error = null" class="absolute inset-y-0 right-0 flex items-center mr-4">
    <svg class="w-4 h-4 fill-current" role="button" viewBox="0 0 20 20"><path
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd" fill-rule="evenodd"></path></svg>
  </span>
    </div>
    <div v-if="$store.state.updated" class="relative py-3 pl-4 pr-10 leading-normal text-blue-700 bg-blue-100 "
         role="alert">
      <p class="font-bold">Bravo!!</p>
      <p>{{ $store.state.updated }}</p>

      <span @click="$store.state.updated = null" class="absolute inset-y-0 right-0 flex items-center mr-4">
    <svg class="w-4 h-4 fill-current" role="button" viewBox="0 0 20 20"><path
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd" fill-rule="evenodd"></path></svg>
  </span>
    </div>
    <div v-if="$store.state.created" class="relative py-3 pl-4 pr-10 leading-normal text-green-700 bg-green-100 "
         role="alert">
      <p class="font-bold">Bravo!!</p>
      <p>{{ $store.state.created }}</p>

      <span @click="$store.state.created = null" class="absolute inset-y-0 right-0 flex items-center mr-4">
    <svg class="w-4 h-4 fill-current" role="button" viewBox="0 0 20 20"><path
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd" fill-rule="evenodd"></path></svg>
  </span>
    </div>

    <router-view/>
  </main>
</template>

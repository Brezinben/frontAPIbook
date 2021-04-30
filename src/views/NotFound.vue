<template>
  <div class="bg-gradient-to-r from-purple-300 to-blue-200 absolute top-0 left-0 w-screen">
    <div class="w-10/12 m-auto py-16 min-h-screen flex items-center justify-center">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
        <div class="border-t border-gray-200 text-center pt-8">
          <h1 class="text-9xl font-bold text-purple-400">404</h1>
          <h1 class="text-6xl font-medium py-8 whitespace-nowrap">😖 oops! la page qui n'existe pas 😖</h1>
          <p class="text-2xl pb-8 px-12 font-medium">Oops! Bah alors on tente des URI qui ne resemble a rien?</p>
          <div class="flex justify-center">
            <button @click="$router.push({name: 'books'})"
                    class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
              LIVRES
            </button>
            <a href="https://github.com/Brezinben/frontAPIbook"
               class="  bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
              Github
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>

</style>
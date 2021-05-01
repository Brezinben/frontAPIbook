<template>
  <main>
    <header class="bg-white shadow flex items-center" v-if="$route.meta.title">
      <svg @click="$router.push({name: 'books'})" class="cursor-pointer" width='177' height='100' viewBox='0 0 177 100'
           fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M88 32.5C88 42.165 80.165 50 70.5 50H53V32.5C53 22.835 60.835 15 70.5 15C80.165 15 88 22.835 88 32.5Z'
              fill='#17CF97'/>
        <path
            d='M88 67.5C88 57.835 95.835 50 105.5 50H123V67.5C123 77.165 115.165 85 105.5 85C95.835 85 88 77.165 88 67.5Z'
            fill='#17CF97'/>
        <path d='M53 67.5C53 77.165 60.835 85 70.5 85H88V67.5C88 57.835 80.165 50 70.5 50C60.835 50 53 57.835 53 67.5Z'
              fill='#17CF97'/>
        <path
            d='M123 32.5C123 22.835 115.165 15 105.5 15H88V32.5C88 42.165 95.835 50 105.5 50C115.165 50 123 42.165 123 32.5Z'
            fill='#17CF97'/>
      </svg>
      <div class=" py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">{{ $route.meta.title }}</h1>
      </div>
    </header>

    <div
        class="flex text-white  transition ease-in duration-200 text-center text-4xl md:text-base font-semibold shadow-md focus:outline-none">
      <router-link
          :to="{ name: 'createBook'}"
          class="py-2 px-4 bg-gradient-to-r from-purple-400  to-green-500 hover:from-pink-500 hover:to-yellow-500 w-full "
      >📚<span class="hidden md:inline"> - Ajouter un livre</span>
      </router-link>

      <router-link
          class="py-2 px-4 bg-gradient-to-r from-green-500  to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full"
          :to="{ name: 'createAuthor'}">💂<span class="hidden  md:inline"> - Ajouter un Auteur</span>
      </router-link>

      <router-link
          class="py-2 px-4 bg-gradient-to-r from-blue-500  to-pink-500 hover:from-pink-500 hover:to-yellow-500 w-full "
          :to="{ name: 'createCategory'}">🧮<span class="hidden md:inline"> - Ajouter une Categrorie</span>
      </router-link>

    </div>

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

    <div class="mt-6">
      <router-view/>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  watch: {
    //appeller à chaque route
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      ['categories', 'authors', 'books']
          //On garde les valeurs qui ont besoin d'être charger
          .filter(e => !this.$store.state[e])
          .forEach(el =>
              axios.get(`http://127.0.0.1:8000/api/${el}/`, {headers: this.$store.state.headers})
                  //Viens hydrater les valeurs dans le store
                  .then(r => {
                    console.log(r.data.data)
                    this.$store.commit('hydrate' + el.charAt(0).toUpperCase() + el.slice(1), r.data.data)
                  })
                  .catch((e) => this.$store.commit('setError', e))
          );
    }
  }
}
</script>
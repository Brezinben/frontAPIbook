<template>
  <main>
    <header class="bg-white shadow flex items-center" v-if="$route.meta.title">
      <main-logo/>
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

    <alert :alert-status="$store.state.error" first-message="Be Warned" class-style="text-red-700 bg-red-100"/>
    <alert :alert-status="$store.state.created" first-message="Bravo !!" class-style="text-green-700 bg-green-100"/>
    <alert :alert-status="$store.state.updated" first-message="Bravo !!" class-style="text-blue-700 bg-blue-100"/>

    <div class="mt-6">
      <router-view/>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import MainLogo from "./assets/logos/MainLogo.vue";
import Alert from "./components/Alert.vue";

export default {
  components: {
    MainLogo,
    Alert
  },
  watch: {
    //appeler à chaque route
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      ['categories', 'authors', 'books']
          //On garde les valeurs qui ont besoin d'être charger
          .filter(e => !this.$store.state[e])
          .forEach(el =>
              axios.get(`http://127.0.0.1:8000/api/${el}/`, {headers: this.$store.state.headers})
                  //Viens hydrater les valeurs dans le store eg:hydrateBooks
                  .then(r => this.$store.commit('hydrate' + el.charAt(0).toUpperCase() + el.slice(1), r.data.data))
                  .catch(e => this.$store.commit('setError', e))
          )
      ;
    }
  }
}
</script>
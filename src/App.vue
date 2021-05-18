<template>
  <main>
    <header class="scrollIndication"></header>
    <header class="bg-white shadow flex items-center" v-if="$route.meta.title">
      <main-logo/>
      <div class=" py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">{{ $route.meta.title }}</h1>
      </div>
      <check-token></check-token>
    </header>

    <transition name="fade">
      <div v-if="edition"
           class="flex text-white  transition ease-in duration-200 text-center text-4xl md:text-base font-semibold shadow-md focus:outline-none">
        <router-link
            :to="{ name: 'createBook'}"
            class="py-2 px-4 bg-gradient-to-r from-purple-400  to-green-500 hover:from-pink-500 hover:to-yellow-500 w-full "
        >📚<span class="hidden md:inline"> - Ajouter un livre</span>
        </router-link>

        <router-link
            :to="{ name: 'createAuthor'}"
            class="py-2 px-4 bg-gradient-to-r from-green-500  to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full">
          💂<span class="hidden  md:inline"> - Ajouter un Auteur</span>
        </router-link>

        <router-link
            :to="{ name: 'createCategory'}"
            class="py-2 px-4 bg-gradient-to-r from-blue-500  to-pink-500 hover:from-pink-500 hover:to-yellow-500 w-full ">
          🧮<span class="hidden md:inline"> - Ajouter une Categrorie</span>
        </router-link>

      </div>
    </transition>
    <alert/>

    <div class="mt-6">
      <router-view/>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import MainLogo from "./assets/logos/MainLogo.vue";
import Alert from "./components/Alert.vue";
import CheckToken from "./components/checkToken.vue";

export default {
  components: {
    MainLogo,
    Alert,
    CheckToken,
  },
  watch: {
    //appeler à chaque route
    '$route': ['fetchData', 'resetAlert']
  },
  methods: {
    resetAlert() {
      //On garde que les alertes d'authentification. On devrait mettre ici une constante.
      if (this.$store.state.alert.message !== "👹 Vous n'êtes pas Authentifier 👹") {
        this.$store.state.alert = {
          show: false,
          type: null,
          message: null,
          header: null,
        }
      }
    },
    fetchData() {
      ['categories', 'authors', 'books']
          //On garde les valeurs qui ont besoin d'être charger
          .filter(e => !this.$store.state[e])
          .forEach(el =>
              axios.get(`http://127.0.0.1:8000/api/${el}/`, {headers: this.$store.getters.getHeaders})
                  //Viens hydrater les valeurs dans le store eg:hydrateBooks
                  .then(r => this.$store.commit('hydrate' + el.charAt(0).toUpperCase() + el.slice(1), r.data.data))
                  .catch(e => this.$store.commit({
                    type: 'setAlert',
                    alert: {
                      type: 'error',
                      message: e,
                      header: "Erreur",
                    }
                  }))
          )
      ;
    },
  },
  computed: {
    edition() {
      return this.$store.getters.isEditing
    }
  }
}
</script>
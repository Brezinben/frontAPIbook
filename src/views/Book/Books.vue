<template>
  <div
      class="flex mb-6 text-white  transition ease-in duration-200 text-center text-4xl md:text-base font-semibold shadow-md focus:outline-none">
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

  <div class="container mx-auto text-white">
    <label for="s">Status</label>
    <div class="flex">
      <select name="pets" id="s"
              v-model="status"
              class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        <option value="">Filter par Status</option>
        <option v-for="p in ['disponible', 'en_approvisionnement', 'non_édité']" :value="p">{{ p }}</option>

      </select>
      <button v-if="status" @click="resetStatus" type="button"
              class=" ml-4  py-2 px-4 flex justify-center  items-center  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-12 h-12 rounded-lg ">
        <svg class="h-12 w-12 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5"/>
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5"/>
        </svg>
      </button>
    </div>

    <label for="c">Category</label>
    <div class="flex">
      <select id="c"
              v-model="category"
              class="w-full bg-gray-800   rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        <option value="">Filter par Categorie</option>
        <option v-for="c in categories" :value="c.id">{{ c.title }}</option>
      </select>
      <button v-if="category" @click="resetCategory" type="button"
              class=" ml-4  py-2 px-4 flex justify-center  items-center  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-12 h-12 rounded-lg ">
        <svg class="h-12 w-12 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5"/>
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5"/>
        </svg>
      </button>
    </div>

    <label for="a">Author</label>
    <div class="flex">
      <select v-model="author" id="a"
              class="w-full bg-gray-800   rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        <option value="">Filter par Auteur</option>
        <option v-for="author in authors" :value="author.id">{{ author.first_name }}
          {{ author.last_name }}
        </option>
      </select>
      <button v-if="author" @click="resetAuthor" type="button"
              class=" ml-4 py-2 px-4 flex justify-center  items-center  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-12 h-12 rounded-lg ">
        <svg class="h-12 w-12 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5"/>
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5"/>
        </svg>
      </button>
    </div>

    <label class="inline-flex ml-4 items-center mt-3">
      <input type="checkbox" v-model="edition" class="form-checkbox rounded-md h-5 w-5 text-yellow-400" checked>
      <span class="ml-2  text-gray-100">
        Edition
      </span>
    </label>

  </div>

  <div v-if="filteredBook"
       class="grid  grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-6  container mx-auto my-6">
    <card-book @change-filter-category="filterCat" @change-filter-author="filterAut" :edition="edition"
               v-for="b in filteredBook"
               v-bind:key="b.id" :book="b"/>
  </div>
  <div v-else-if="status||author||category"
       class="flex flex-col items-center justify-center mt-10 text-2xl text-gray-100 space-y-4">
    <div class="text-5xl">Pas de Livre Trouvé 🥴</div>
    <div>Les critères de recheche :</div>
    <div v-if="status">{{ status }}</div>
    <div v-if="author" class="flex space-x-4">
      <div>L'auteur - {{ author }}</div>
      <router-link
          v-if="edition"
          class="bg-red-500 block text-white hover:bg-red-600 active:bg-red-600 font-bold uppercase text-xs px-2 py-1 rounded-md shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          :to="{ name: 'editAuthor', params: { id: author}}">
        <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
             stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
          <line x1="16" y1="5" x2="19" y2="8"/>
        </svg>
      </router-link>
    </div>
    <div v-if="category" class="flex space-x-4">
      <div> La catégorie - {{ category }}</div>
      <router-link
          v-if="edition"
          class="bg-indigo-500 block text-white hover:bg-indigo-600 active:bg-indigo-600 font-bold uppercase text-xs px-2 py-1 rounded-md shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          :to="{ name: 'editCategory', params: { id: category}}">
        <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
             stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
          <line x1="16" y1="5" x2="19" y2="8"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardBook from "../../components/CardBook.vue";

export default {
  name: "Books",
  components: {
    CardBook,
  },
  data: () => {
    return {
      edition: false,
      author: "",
      category: "",
      status: "",
    }
  },
  async mounted() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer CCDENpQR0aX6hqBAARH0UbKk2tAtdf6pF8QrZb6N'
    };

    ['categories', 'authors', 'books']
        .filter(e => !this[e])
        .forEach(el =>
            axios.get(`http://127.0.0.1:8000/api/${el}/`, {headers: headers})
                .then((r) => this.$store.commit('hydrate' + el.charAt(0).toUpperCase() + el.slice(1), r.data.data))
                .catch((e) => this.$store.commit('setError', e)));
  },
  methods: {
    resetStatus() {
      this.status = "";
    },
    resetCategory() {
      this.category = "";
    },
    resetAuthor() {
      this.author = "";
    },
    filterCat(payload) {
      this.category = payload.category;
    },
    filterAut(payload) {
      this.author = payload.author;
    },
  }, computed: {
    filteredBook() {
      if (this.books) {
        let toFilter = this.books;
        if (this.author) {
          toFilter = toFilter.filter(b => b.author.id === this.author)
        }
        if (this.category) {
          toFilter = toFilter.filter(b => b.category.id === this.category)
        }
        if (this.status) {
          toFilter = toFilter.filter(b => b.status === this.status)
        }
        return toFilter.length ? toFilter : null;
      }
    },
    books() {
      return this.$store.getters.getBooks
    },
    authors() {
      return this.$store.getters.getAuthors
    },
    categories() {
      return this.$store.getters.getCategories
    },

  }
}
</script>

<style scoped>

</style>
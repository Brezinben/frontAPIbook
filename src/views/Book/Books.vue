<template>

  <div v-if="categories?.length&&authors?.length" class="container mx-auto text-white space-y-3">
    <div class="flex flex-col space-y-2">
      <label for="s">Filter par Status</label>
      <div class="flex">
        <select name="pets" id="s"
                v-model="status"
                class="form__input">
          <option v-for="p in ['disponible', 'en_approvisionnement', 'non_édité']" :value="p">{{ p }}</option>

        </select>
        <button v-if="status" class="reset-field-filter" type="button" @click="resetStatus">
          <svg class="h-12 w-12 " width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
               stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5"/>
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="categories" class="flex flex-col space-y-2">
      <label for="c">Filter par Categorie</label>
      <div class="flex">
        <select id="c"
                v-model="category"
                class="form__input">
          <option v-for="c in categories" :value="c">{{ c.title }}</option>
        </select>

        <button v-if="category?.id" class="reset-field-filter" type="button" @click="resetCategory">
          <svg class="h-12 w-12" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
               stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5"/>
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="authors" class="flex flex-col space-y-2">
      <label for="a">Filter par Auteur</label>
      <div class="flex">
        <select id="a" v-model="author" class="form__input">
          <option v-for="author in authors" :value="author">{{ author.first_name + " " + author.last_name }}</option>
        </select>

        <button v-if="author?.id" @click="resetAuthor" type="button"
                class="reset-field-filter">
          <svg class="h-12 w-12" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
               stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5"/>
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <div v-if="filteredBook"
       class="grid  grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-6  container mx-auto my-6">
    <card-book
        v-for="b in filteredBook"
        v-bind:key="b.id"
        :book="b"
        @change-filter-category="filterCat" @change-filter-author="filterAut"/>
  </div>

  <div v-else-if="status||author?.first_name||category?.title"
       class="flex flex-col items-center justify-center mt-10 text-2xl text-gray-100 space-y-4">
    <div class="text-5xl">Pas de Livre Trouvé 🥴</div>
    <div>Les critères de recherche :</div>
    <div v-if="status">{{ status }}</div>
    <div v-if="author.first_name" class="flex space-x-4">
      <div>L'auteur - {{ author.first_name }} {{ author.last_name }}</div>
      <router-link
          v-if="edition"
          @click="$store.commit('setCurrentAuthor',author)"
          class="bg-red-500 block text-white hover:bg-red-600 active:bg-red-600 font-bold uppercase text-xs px-2 py-1 rounded-md shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          :to="{ name: 'editAuthor', params: { id: author.id}}">
        <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
             stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
          <line x1="16" y1="5" x2="19" y2="8"/>
        </svg>
      </router-link>
    </div>
    <div v-if="category.title" class="flex space-x-4">
      <div> La catégorie - {{ category.title }}</div>
      <router-link
          v-if="edition"
          @click="$store.commit('setCurrentCategory',category)"
          class="bg-indigo-500 block text-white hover:bg-indigo-600 active:bg-indigo-600 font-bold uppercase text-xs px-2 py-1 rounded-md shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          :to="{ name: 'editCategory', params: { id: category.id}}">
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
import CardBook from "../../components/CardBook.vue";

export default {
  name: "Books",
  components: {
    CardBook,
  },
  data: () => {
    return {
      author: null,
      category: null,
      status: null,
    }
  },
  mounted() {
    this.author = {id: null};
    this.category = {id: null};
  },
  methods: {
    resetStatus() {
      this.status = null;
    },
    resetCategory() {
      this.category = {id: null};
    },
    resetAuthor() {
      this.author = {id: null};
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
        if (this.author?.id) {
          toFilter = toFilter.filter(b => b.author.id === this.author.id)
        }
        if (this.category?.id) {
          toFilter = toFilter.filter(b => b.category.id === this.category.id)
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
    edition() {
      return this.$store.getters.isEditing
    }
  }
}

</script>
<style scoped>
.reset-field-filter {
  @apply ml-4 py-2 px-4 flex justify-center  items-center  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200   transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-12 h-12 rounded-lg
}

.reset-field-filter:hover svg {
  transform: rotateZ(180deg) scale(1.1);
  transition-duration: 900ms;
}
</style>
<template>
  <div v-if="category" class=" container mx-auto text-gray-100">
    <label class="form-label" for="t">Title</label>
    <input id="t" v-model="category.title"
           class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           type="text">

    <div class="flex items-center">
      <button @click="updateCategory"
              class="mt-5 mr-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit">Modifier
      </button>
      <button v-if="bookCount===0" @click="deleteCategory"
              class="mt-5 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              type="submit">Suprimer
      </button>
      <div v-else class="text-yellow-100">
        Vous ne pouvez pas supprimer cet categorie car elle est lié à {{ bookCount }} livres.
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategoryEdit",
  data() {
    return {
      bookCount: null
    }
  }, mounted() {
    this.bookCount = this.category?.book_count ? this.category.book_count : 0;
  },
  methods: {
    updateCategory() {
      if (this.category.title) {
        axios.put(`http://127.0.0.1:8000/api/categories/${this.category.id}`, {
          "title": this.category.title,
        }, {headers: this.$store.state.headers})
            .then(r => {
              this.$store.state.categories = null;
              this.$store.state.books = null;
              this.$store.commit('setUpdated', "La categorie a bien été modifier");
              this.$router.push({name: 'books'})
            })
            .catch(e => this.$store.commit('setError', e))
      }
    },
    deleteCategory() {
      if (confirm("Vous êtes sûr ?")) {
        axios.delete(`http://127.0.0.1:8000/api/categories/${this.$route.params.id}`, {headers: this.$store.state.headers})
            .then(r => {
              this.$store.state.categories = null;
              this.$store.state.books = null;
              this.$store.commit('setUpdated', "La categorie a bien été supprimer");
              this.$router.push({name: 'books'})
            })
            .catch(e => this.$store.commit('setError', e))
      }
    }
  },
  computed: {
    category() {
      return this.$store.getters.getCurrentCategory
    }
  }
}
</script>

<style scoped>

</style>
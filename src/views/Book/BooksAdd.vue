<template>

  <div class=" container mx-auto text-gray-100">

    <label class="form-label" for="t">Titre</label>
    <input id="t" v-model="book.title"
           class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           type="text">

    <label class="form-label" for="p">Publish Date</label>
    <input id="p" v-model="book.publishDate" type="date"
           class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">

    <label for="s">Status</label>
    <select name="pets" id="s"
            v-model="book.status"
            class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
      <option v-for="p in ['disponible', 'en_approvisionnement', 'non_édité']" :value="p">{{ p }}</option>

    </select>

    <label for="c">Category</label>
    <select id="c"
            v-model="book.category"
            class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
      <option v-for="category in categories" :value="category.id">
        {{ category.id }} - {{ category.title }}
      </option>
    </select>

    <label for="a">Author</label>
    <select id="a"
            v-model="book.author"
            class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
      <option v-for="author in authors" :value="author.id">
        {{ author.id }} - {{ author.first_name }} {{ author.last_name }}
      </option>
    </select>

    <button @click="saveCharacter"
            class="mt-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            type="submit">Ajouter
    </button>

  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "BooksAdd"
  ,
  data() {
    return {
      book: {
        title: null,
        publishDate: null,
        status: null,
        category: null,
        author: null,
      },
    }
  },
  methods: {
    saveCharacter() {
      if (this.book.title && this.book.publishDate && this.book.category && this.book.author && this.book.status) {
        axios.post("http://127.0.0.1:8000/api/books/", {
          "title": this.book.title,
          "release_date": this.book.publishDate,
          "status": this.book.status,
          'category': this.book.category,
          'author': this.book.author,
        }, {headers: this.$store.state.headers})
            .then(() => {
              this.book.title = null;
              this.book.publishDate = null;
              this.book.status = null;
              this.book.category = null;
              this.book.author = null;

              this.$store.state.books = null;
              this.$store.commit('setCreated', "Le livre a été crée.");
            })
            .catch((e) => this.$store.commit('setError', e))
      }
    },
  },
  computed: {
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

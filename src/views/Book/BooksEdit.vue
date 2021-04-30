<template>
  <div v-if="error" class="bg-red-200 border-red-600 text-red-600 border-l-4 p-4" role="alert">
    <p class="font-bold">Be Warned</p>
    <p>Something not ideal might be happening.</p>
    <br>
    <p>{{ error }}</p>
  </div>

  <div v-if="book" class=" container mx-auto text-gray-100">
    <label class="form-label" for="t">Titre</label>
    <input id="t" v-model="book.title"
           class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           type="text">

    <label class="form-label" for="p">Publish Date</label>
    <input id="p" v-model="book.publish_date" type="date"
           class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">

    <label for="s">Status</label>
    <select name="pets" id="s"
            v-model="book.status"
            class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
      <option v-for="p in ['disponible', 'en_approvisionnement', 'non_édité']" :value="p">{{ p }}</option>

    </select>

    <label for="c">Category</label>
    <select id="c"
            v-model="book.category.id"
            class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
      <option v-for="category in categories" :value="category.id">
        {{ category.id }} - {{ category.title }}
      </option>
    </select>

    <label for="a">Author</label>
    <select id="a"
            v-model="book.author.id"
            class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
      <option v-for="author in authors" :value="author.id">
        {{ author.id }} - {{ author.first_name }} {{ author.last_name }}
      </option>
    </select>

    <div class="flex">
      <button @click="saveCharacter"
              class="mt-5 mr-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit">Modifier
      </button>
      <button @click="deleteBook"
              class="mt-5 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              type="submit">Suprimer
      </button>
    </div>

  </div>

</template>

<script>
import axios from "axios";

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer CCDENpQR0aX6hqBAARH0UbKk2tAtdf6pF8QrZb6N'
}
export default {
  name: "BooksEdit",
  data() {
    return {
      error: null,
      updated: null,
      book: null,
      authors: null,
      categories: null,
    }
  }, mounted() {
    ['categories', 'authors'].forEach(el =>
        axios.get(`http://127.0.0.1:8000/api/${el}/`, {headers: headers})
            .then((r) => this[el] = r.data.data)
            .catch((e) => this.error = e)
    );

    axios.get(`http://127.0.0.1:8000/api/books/${this.$route.params.id}`, {headers: headers})
        .then((r) => this.book = r.data.data)
        .catch((e) => this.error = e)
  },
  methods: {
    saveCharacter() {
      if (this.book.title && this.book.publish_date && this.book.category.id && this.book.author.id && this.book.status) {
        axios.put(`http://127.0.0.1:8000/api/books/${this.book.id}`, {
          "title": this.book.title,
          "publish_date": this.book.publish_date,
          "status": this.book.status,
          'category_id': this.book.category.id,
          'author_id': this.book.author.id,
        }, {headers: headers})
            .then((r) => {
              this.$emit('book-updated');
              this.$router.go(-1)
            })
            .catch((e) => this.error = e)
      }
    },
    deleteBook() {
      if (confirm("Vous êtes sûr ?")) {
        axios.delete(`http://127.0.0.1:8000/api/books/${this.$route.params.id}`, {headers: headers})
            .then((r) => {
              this.$emit('book-deleted', {message: "Le livre a bien été suprimer"});
              this.$router.go(-1)
            })
            .catch((e) => this.error = e)
      }
    },
  },
}
</script>

<style scoped>

</style>
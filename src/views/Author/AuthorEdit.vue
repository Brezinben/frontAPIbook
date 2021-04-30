<template>

  <div v-if="author" class=" container mx-auto text-gray-100">

    <label class="form-label" for="t">Prénom</label>
    <input id="t" v-model="author.first_name"
           class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           type="text">

    <label class="form-label" for="f">Nom de famille</label>
    <input id="f" v-model="author.last_name"
           class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           type="text">

    <label class="form-label" for="b">Date de naissance</label>
    <input id="b" v-model="author.birth_date" type="date"
           class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">

    <label class="form-label" for="d">Date de décès (Optionnel)</label>
    <input id="d" v-model="author.death_date" type="date"
           class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">

    <div class="flex items-center">
      <button @click="saveCharacter"
              class="mt-5 mr-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit">Modifier
      </button>
      <button v-if="bookCount===0" @click="deleteAuthor"
              class="mt-5 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              type="submit">Suprimer
      </button>
      <div v-else class="text-yellow-100">
        Vous ne pouvez pas supprimer cet auteur car il est lié à {{ bookCount }} livres.
      </div>
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
  name: "AuthorEdit",
  data() {
    return {
      author: null,
      bookCount: null
    }
  }, mounted() {
    axios.get(`http://127.0.0.1:8000/api/authors/${this.$route.params.id}`, {headers: headers})
        .then((r) => {
          this.author = r.data.data;
          this.bookCount = this.author?.books?.length ? this.author.books.length : 0;
        })
        .catch((e) => this.$store.commit('setError', e))
  },
  methods: {
    saveCharacter() {
      if (this.author.first_name && this.author.last_name && this.author.birth_date) {
        axios.put(`http://127.0.0.1:8000/api/authors/${this.author.id}`, {
          "first_name": this.author.first_name,
          "last_name": this.author.last_name,
          "birth_date": this.author.birth_date,
          "death_date": this.author.death_date,
        }, {headers: headers})
            .then((r) => {
              this.$store.commit('setUpdated', "L'auteur a été modifier.");
              this.$router.go(-1)
            })
            .catch((e) => this.$store.commit('setError', e))
      }
    },
    deleteAuthor() {
      axios.delete(`http://127.0.0.1:8000/api/authors/${this.$route.params.id}`, {headers: headers})
          .then((r) => {
            this.$store.commit('setUpdated', "L'auteur a été supprimer.");
            this.$router.go(-1)
          })
          .catch((e) => this.$store.commit('setError', e))
    }
  },
}
</script>

<style scoped>

</style>
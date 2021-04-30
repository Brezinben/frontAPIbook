<template>
  <div class=" container mx-auto text-gray-100">

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


    <button @click="saveCharacter"
            class="mt-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            type="submit">Ajouter
    </button>

  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AuthorAdd"
  ,
  data() {
    return {
      author: {
        first_name: null,
        last_name: null,
        birth_date: null,
        death_date: null,
      },
    }
  },
  methods: {
    saveCharacter() {
      if (this.author.first_name && this.author.last_name && this.author.birth_date) {
        axios.post("http://127.0.0.1:8000/api/authors/", {
          "first_name": this.author.first_name,
          "last_name": this.author.last_name,
          "birth_date": this.author.birth_date,
          "death_date": this.author.death_date,
        }, {headers: this.$store.state.headers})
            .then(() => {
              this.author.first_name = null;
              this.author.last_name = null;
              this.author.birth_date = null;
              this.author.death_date = null;

              this.$store.state.authors = null;
              this.$store.state.books = null;
              this.$store.commit('setCreated', "L'auteur a été crée.");
            })
            .catch((e) => this.$store.commit('setError', e))
      }
    },
  },
}
</script>

<style scoped>

</style>

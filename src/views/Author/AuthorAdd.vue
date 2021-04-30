<template>
  <div v-if="error" class="bg-red-200 border-red-600 text-red-600 border-l-4 p-4" role="alert">
    <p class="font-bold">Be Warned</p>
    <p>Something not ideal might be happening.</p>
    <br>
    <p>{{ error }}</p>
  </div>
  <div v-if="created" class="bg-green-200 border-green-600 text-green-600 border-l-4 p-4" role="alert">
    <p class="font-bold">Bravo !!</p>
    <p>{{ created }}</p>
  </div>

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

const headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer CCDENpQR0aX6hqBAARH0UbKk2tAtdf6pF8QrZb6N'
}
export default {
  name: "AuthorAdd"
  ,
  data() {
    return {
      error: null,
      created: null,
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
        }, {headers: headers})
            .then(() => {
              this.author.first_name = null;
              this.author.last_name = null;
              this.author.birth_date = null;
              this.author.death_date = null;
              this.$emit('author-created');
              this.created = "L'auteur a été crée.";
            })
            .catch((e) => this.error = e)
      }
    },
  },
}
</script>

<style scoped>

</style>

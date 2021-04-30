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
    
    <label class="form-label" for="t">Title</label>
    <input id="t" v-model="category.title"
           class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           type="text">

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
      category: {
        title: null,
      },
    }
  },
  methods: {
    saveCharacter() {
      if (this.category.title) {
        axios.post("http://127.0.0.1:8000/api/categories/", {
          "title": this.category.title,
        }, {headers: headers})
            .then(() => {
              this.category.title = null;
              this.$emit('category-created');
              this.created = "La catégorie a été crée.";
            })
            .catch((e) => this.error = e)
      }
    },
  },
}
</script>

<style scoped>

</style>

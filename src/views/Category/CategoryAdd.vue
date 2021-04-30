<template>
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

export default {
  name: "CategoryAdd"
  ,
  data() {
    return {
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
        }, {headers: this.$store.state.headers})
            .then(() => {
              this.category.title = null;

              this.$store.state.categories = null;
              this.$store.state.books = null;
              this.$store.commit('setCreated', "La catégorie a été crée.");
            })
            .catch((e) => this.$store.commit('setError', e))
      }
    },
  },
}
</script>

<style scoped>

</style>

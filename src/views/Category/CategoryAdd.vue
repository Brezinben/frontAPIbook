<template>
  <div class=" container mx-auto text-gray-100">

    <form-category :category="category"/>

    <button @click="add"
            class="mt-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            type="submit">Ajouter
    </button>

  </div>
</template>
<script>
import axios from "axios";
import FormCategory from "@/components/form/FormCategory.vue";

export default {
  name: "CategoryAdd",
  components: {
    FormCategory,
  }
  ,
  data() {
    return {
      category: {
        title: null,
      },
    }
  },
  methods: {
    /**
     * Vérifie que le "formulaire" est bon
     * @return boolean
     * */
    checkForm(event) {
      //On reset les erreurs
      this.$store.state.errorsForm = [];
      //condition
      if (this.category.title) return true

      this.$store.commit({
        type: 'setAlert',
        alert: {
          type: 'warning',
          message: "Il y a une erreur dans le formulaire.",
          header: "Attention!!",
        }
      });
      this.$store.state.errorsForm.title = "Le titre est requis.";
      event.preventDefault();
      return false;
    },
    /**
     * Rajoute une catégorie.
     * @return void
     * */
    add(event) {
      if (this.checkForm(event)) {
        axios.post("http://127.0.0.1:8000/api/categories/", {
          "title": this.category.title,
        }, {headers: this.$store.getters.getHeaders})
            .then(() => {
              //Reset les attributs
              Object.getOwnPropertyNames(this.category).forEach(p => this.category[p] = null);

              this.$store.state.categories = this.$store.state.books = null;
              this.$store.commit({
                type: 'setAlert',
                alert: {
                  type: 'created',
                  message: "La catégorie a été crée.",
                  header: "Bravo!!",
                }
              });
            })
            .catch(e => this.$store.commit('setErrorFrom', e))
      }
    },
  },
}
</script>

<template>
  <div v-if="category" class=" container mx-auto text-gray-100">

    <form-category :category="category"/>

    <div class="flex items-center">
      <button @click="update"
              class="mt-5 mr-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit">Modifier
      </button>
      <button v-if="bookCount===0" @click="delete"
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
import FormCategory from "@/components/form/FormCategory.vue";

export default {
  name: "CategoryEdit",
  components: {
    FormCategory,
  },
  data() {
    return {
      bookCount: null,
      tempCategory: null
    }
  }, mounted() {
    this.bookCount = this.category?.book_count ? this.category.book_count : 0;
    this.tempCategory = {...this.category};
  },
  methods: {
    /**
     * Vérifie que le "formulaire" est bon
     * @return boolean
     * */
    checkForm(event) {
      let message;
      //On reset les erreurs
      this.$store.state.errorsForm = [];
      let unchanged = this.isEqual(this.tempCategory, this.category);
      //condition
      if (!unchanged && this.category.title) return true

      if (unchanged) message = "Vous n'avez rien changer."
      this.$store.commit({
        type: 'setAlert',
        alert: {
          type: 'warning',
          message: message || "Il y a une erreur dans le formulaire.",
          header: "Attention!!",
        }
      });
      if (!this.category.title) this.$store.state.errorsForm.title = "Le titre est requis.";
      event.preventDefault();
      return false;
    },
    /** Met a jour la catégorie */
    update(event) {
      if (this.checkForm(event)) {
        axios.put(`http://127.0.0.1:8000/api/categories/${this.category.id}`, {
          "title": this.category.title,
        }, {headers: this.$store.state.headers})
            .then(r => {
              this.$store.state.categories = null;
              this.$store.state.books = null;
              this.$store.commit({
                type: 'setAlert',
                alert: {
                  type: 'updated',
                  message: "La categorie a bien été modifier",
                  header: "Bravo!!",
                }
              });
              this.$router.push({name: 'books'})
            })
            .catch(e => this.$store.commit('setErrorFrom', e))
      }
    },
    /** Supprime la catégorie et redirect */
    delete() {
      if (confirm("Vous êtes sûr ?")) {
        axios.delete(`http://127.0.0.1:8000/api/categories/${this.$route.params.id}`, {headers: this.$store.state.headers})
            .then(r => {
              this.$store.state.categories = null;
              this.$store.state.books = null;
              this.$store.commit({
                type: 'setAlert',
                alert: {
                  type: 'deleted',
                  message: "La categorie a bien été supprimer",
                  header: "Bravo!!",
                }
              });
              this.$router.push({name: 'books'})
            })
            .catch(e => this.$store.commit({
              type: 'setAlert',
              alert: {
                type: 'error',
                message: e,
                header: "Erreur",
              }
            }))
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
<template>

  <div v-if="book" class=" container mx-auto text-gray-100">
    <form-book :book="book"/>

    <div class="flex items-center">
      <button @click="update"
              class="mt-5 mr-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit">Modifier
      </button>
      <button v-if="isAdmin" type="submit"
              class="mt-5 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              @click="destroy">Supprimer
      </button>
      <div v-else class="text-yellow-100">
        Vous ne pouvez pas supprimer cet auteur, car vous n'êtes pas Admin.
      </div>
    </div>
  </div>

</template>

<script>
import FormBook from "@/components/form/FormBook.vue";
import axios from "axios";

export default {
  name: "BooksEdit",
  components: {FormBook},
  data() {
    return {
      tempBook: null
    }
  },
  mounted() {
    this.tempBook = {...this.book};
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
      //On vérifie qu'il a été modifier
      let unchanged = this.isEqual(this.tempBook, this.book);
      //condition
      if (!unchanged && this.book.title && this.book.publish_date && this.book.category && this.book.author && this.book.status) return true

      if (unchanged) message = "Vous n'avez rien changer."

      this.$store.commit({
        type: 'setAlert',
        alert: {
          type: 'warning',
          message: message || "Il y a une erreur dans le formulaire.",
          header: "Attention!!",
        }
      });
      if (!this.book.title) this.$store.state.errorsForm.title = "Le prénom est requis.";
      if (!this.book.publish_date) this.$store.state.errorsForm.publish_date = "La date de publication est requis.";
      if (!this.book.category) this.$store.state.errorsForm.category = "La catégorie est requis.";
      if (!this.book.author) this.$store.state.errorsForm.author = "L'auteur est requis.";
      if (!this.book.status) this.$store.state.errorsForm.status = "Le status est requis.";
      event.preventDefault();
      return false;
    },
    /** Met à jour un livre.*/
    update(event) {
      if (this.checkForm(event)) {
        axios.put(`http://127.0.0.1:8000/api/books/${this.book.id}`, {
          "title": this.book.title,
          "publish_date": this.book.publish_date,
          "status": this.book.status,
          'category_id': this.book.category.id,
          'author_id': this.book.author.id,
        }, {headers: this.$store.getters.getHeaders})
            .then(r => {
              this.$store.state.authors = this.$store.state.categories = this.$store.state.books = null;
              this.$store.commit({
                type: 'setAlert',
                alert: {
                  type: 'updated',
                  message: "Le livre a bien été modifier",
                  header: "Bravo !!",
                }
              })
              this.$router.push({name: 'books'})
            })
            .catch(e => this.$store.commit('setErrorFrom', e))
      }
    },
    /** Supprime un livre.*/
    destroy() {
      if (confirm("Vous êtes sûr ?")) {
        axios.delete(`http://127.0.0.1:8000/api/books/${this.$route.params.id}`, {headers: this.$store.getters.getHeaders})
            .then(r => {
              this.$store.state.authors = this.$store.state.categories = this.$store.state.books = null;
              this.$store.commit({
                type: 'setAlert',
                alert: {
                  type: 'deleted',
                  message: "Le livre a bien été supprimer",
                }
              });
              this.$router.push({name: 'books'})
            })
            .catch(e => this.$store.commit('setErrorFrom', e))
      }
    },
  },
  computed: {
    book() {
      return this.$store.getters.getCurrentBook
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
  }
}
</script>

<style scoped>

</style>
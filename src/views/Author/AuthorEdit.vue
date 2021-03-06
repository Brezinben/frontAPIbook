<template>

  <div v-if="author" class=" container mx-auto text-gray-100">
    <form-author :author="author"/>

    <div class="flex items-center">
      <button @click="update"
              class="mt-5 mr-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit">Modifier
      </button>
      <button v-if=" isAdmin && bookCount===0 " type="submit"
              class="mt-5 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              @click="destroy">Supprimer
      </button>
      <div v-else-if="bookCount!==0" class="text-yellow-100">
        Vous ne pouvez pas supprimer cet auteur car il est lié à {{ bookCount }} livres.
      </div>
      <div v-else class="text-yellow-100">
        Vous ne pouvez pas supprimer cet auteur, car vous n'êtes pas Admin.
      </div>
    </div>

  </div>

</template>

<script>
import axios from "axios";
import FormAuthor from "@/components/form/FormAuthor.vue";

export default {
  name: "AuthorEdit",
  components: {FormAuthor},
  data() {
    return {
      bookCount: null,
      tempAuthor: null
    }
  },
  mounted() {
    this.bookCount = this.author?.book_count ? this.author.book_count : 0;
    this.tempAuthor = {...this.author};
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
      let unchanged = this.isEqual(this.tempAuthor, this.author);
      //condition
      if (!unchanged && this.author.first_name && this.author.last_name && this.author.birth_date) return true
      if (unchanged) message = "Vous n'avez rien changer."

      this.$store.commit({
        type: 'setAlert',
        alert: {
          type: 'warning',
          message: message || "Il y a une erreur dans le formulaire.",
          header: "Attention!!",
        }
      });
      //On set les messages sur les endroits qui sont pas bon
      if (!this.author.first_name) this.$store.state.errorsForm.first_name = "Le prénom est requis.";
      if (!this.author.last_name) this.$store.state.errorsForm.last_name = "Le nom de famille est requis.";
      if (!this.author.birth_date) this.$store.state.errorsForm.birth_date = "La date de naissance est requis.";

      event.preventDefault();
      return false;
    },
    /** Met a jour l'auteur */
    update(event) {
      if (this.checkForm(event)) {
        axios.put(`http://127.0.0.1:8000/api/authors/${this.author.id}`, {
          "first_name": this.author.first_name,
          "last_name": this.author.last_name,
          "birth_date": this.author.birth_date,
          "death_date": this.author.death_date,
        }, {headers: this.$store.getters.getHeaders})
            .then(r => {
              this.$store.commit({
                type: 'setAlert',
                alert: {
                  type: 'updated',
                  message: "L'auteur a été modifier.",
                  header: "Bravo",
                }
              });
              this.$router.push({name: 'books'});
            })
            .catch(e => this.$store.commit('setErrorFrom', e))
      }
    },
    /** Supprime l'auteur et redirect */
    destroy() {
      if (confirm("Vous êtes sûr ?")) {
        axios.delete(`http://127.0.0.1:8000/api/authors/${this.$route.params.id}`, {headers: this.$store.getters.getHeaders})
            .then(r => {
              this.$store.state.authors = this.$store.state.books = null;

              this.$store.commit({
                type: 'setAlert',
                alert: {
                  type: 'deleted',
                  message: "L'auteur a bien été supprimer",
                }
              });
              this.$router.push({name: 'books'})
            })
            .catch(e => this.$store.commit('setErrorFrom', e))
      }
    }
  },
  computed: {
    author() {
      return this.$store.getters.getCurrentAuthor
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
  }
}
</script>
<template>
  <div class=" container mx-auto text-gray-100">
    <form-author :author="author"/>

    <button @click="add"
            class="mt-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            type="submit">Ajouter
    </button>

  </div>
</template>
<script>
import axios from "axios";
import FormAuthor from "@/components/form/FormAuthor.vue";

export default {
  name: "AuthorAdd",
  components: {FormAuthor},
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
    /**
     * Vérifie que le "formulaire" est bon
     * @return boolean
     * */
    checkForm(event) {
      //On reset les erreurs
      this.$store.state.errorsForm = [];
      //condition
      if (this.author.first_name && this.author.last_name && this.author.birth_date) return true

      this.$store.commit({
        type: 'setAlert',
        alert: {
          type: 'warning',
          message: "Il y a une erreur dans le formulaire.",
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
    /**
     * Rajoute un autheur.
     * @return void
     * */
    add(event) {
      if (this.checkForm(event)) {
        axios.post("http://127.0.0.1:8000/api/authors/", {
          "first_name": this.author.first_name,
          "last_name": this.author.last_name,
          "birth_date": this.author.birth_date,
          "death_date": this.author.death_date,
        }, {headers: this.$store.state.headers})
            .then(r => {
              //Reset les attributs
              Object.getOwnPropertyNames(this.author).forEach(p => this.author[p] = null);

              this.$store.state.authors = null;
              this.$store.state.books = null;
              this.$store.commit({
                type: 'setAlert',
                alert: {
                  type: 'created',
                  message: "L'auteur a été crée.",
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

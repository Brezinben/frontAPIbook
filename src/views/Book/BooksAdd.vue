<template>

  <div class="container mx-auto text-gray-100">
    <form-book :book="book"/>
    <button @click="add"
            class="mt-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            type="submit">Ajouter
    </button>

  </div>
</template>
<script>
import axios from "axios";
import FormBook from "@/components/form/FormBook.vue";

export default {
  name: "BooksAdd",
  components: {FormBook},
  data() {
    return {
      book: {
        title: null,
        publish_date: null,
        status: null,
        category: null,
        author: null,
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
      if (this.book.title && this.book.publish_date && this.book.category && this.book.author && this.book.status) return true

      this.$store.commit({
        type: 'setAlert',
        alert: {
          type: 'warning',
          message: "Il y a une erreur dans le formulaire.",
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
    /**
     * Rajoute un livre.
     * @return void
     * */
    add(event) {
      if (this.checkForm(event)) {
        axios.post("http://127.0.0.1:8000/api/books/", {
          "title": this.book.title,
          "publish_date": this.book.publish_date,
          "status": this.book.status,
          'category': this.book.category.id,
          'author': this.book.author.id,
        }, {headers: this.$store.state.headers})
            .then(() => {
              //Reset les attributs
              Object.getOwnPropertyNames(this.book).forEach(p => this.book[p] = null);

              this.$store.state.books = null;
              this.$store.commit({
                type: 'setAlert',
                alert: {
                  type: 'created',
                  message: "Le livre a été crée.",
                  header: "Bravo!!",
                }
              });
            })
            .catch(e => this.$store.commit('setErrorFrom', e))
      }
    }
  },
}
</script>

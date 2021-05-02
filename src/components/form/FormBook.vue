<template>
  <label class="form-label" for="book-t">Titre</label>
  <input id="book-t" v-model="book.title"
         class="form__input" type="text">
  <form-error-field :error="$store.state.errorsForm.title"/>

  <label class="form-label" for="book-p">Publish Date</label>
  <input id="book-p" v-model="book.publish_date"
         class="form__input" type="date">
  <form-error-field :error="$store.state.errorsForm.publish_date"/>

  <label for="book-s">Status</label>
  <select id="book-s" v-model="book.status" class="form__input" name="pets">
    <option v-for="p in ['disponible', 'en_approvisionnement', 'non_édité']" :value="p">{{ p }}</option>
  </select>
  <form-error-field :error="$store.state.errorsForm.status"/>

  <label for="book-c">Category</label>
  <select id="book-c" v-model="book.category" class="form__input">
    <option v-for="category in categories" :value="category">
      {{ category.title }}
    </option>
  </select>
  <form-error-field :error="$store.state.errorsForm.category"/>

  <label for="book-a">Author</label>
  <select id="book-a" v-model="book.author" class="form__input">
    <option v-for="author in authors" :value="author">
      {{ author.first_name + " " + author.last_name }}
    </option>
  </select>
  <form-error-field :error="$store.state.errorsForm.author"/>
  {{ book.category }}
  <br>
  <br>
  <br>
  {{ book.author }}
</template>

<script>
import FormErrorField from "@/components/form/FormErrorField.vue";

export default {
  name: "FormBook",
  props: ["book"],
  components: {FormErrorField},
  computed: {
    authors() {
      return this.$store.getters.getAuthors
    }
    ,
    categories() {
      return this.$store.getters.getCategories
    }
    ,
  }
}
</script>

<template>
  <label class="form-label" for="cat-t">Title</label>
  <input id="cat-t" v-model="category.title"
         class="form__input"
         type="text">
  <form-error-field :error="$store.state.errorsForm.title"/>
</template>

<script>

import FormErrorField from "@/components/form/FormErrorField.vue";

export default {
  name: "FormCategory",
  components: {
    FormErrorField,
  },
  props: ['category']
}
</script>
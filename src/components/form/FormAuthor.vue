<template>

  <label class="form-label" for="aut-fn">Prénom *</label>
  <input id="aut-fn" v-model="author.first_name"
         class="form__input"
         type="text">
  <form-error-field :error="$store.state.errorsForm.first_name"/>

  <label class="form-label" for="aut-ln">Nom de famille *</label>
  <input id="aut-ln" v-model="author.last_name"
         class="form__input"
         type="text">
  <form-error-field :error="$store.state.errorsForm.last_name"/>

  <label class="form-label" for="aut-bd">Date de naissance *</label>
  <input id="aut-bd" v-model="author.birth_date" class="form__input"
         type="date">
  <form-error-field :error="$store.state.errorsForm.birth_date"/>

  <label class="form-label" for="aut-dd">Date de décès</label>
  <input id="aut-dd" v-model="author.death_date" class="form__input"
         type="date">
  <form-error-field :error="$store.state.errorsForm.death_date"/>

</template>

<script>
import FormErrorField from "@/components/form/FormErrorField.vue";

export default {
  name: "FormAuthor",
  components: {
    FormErrorField,
  },
  props: ['author']
}
</script>

<style scoped>

</style>
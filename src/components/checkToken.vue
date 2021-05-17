<template>
  <div class="flex items-center space-x-5 ">

    <input id="token" v-model="tempToken" class="form__input max-w-xs" placeholder="token" type="text"
           @blur="tokenValidation">

    <div class="flex flex-col">
      <label v-if="isValid" class="inline-flex ml-4 items-center">
        <input v-model="$store.state.editing" checked class="form-checkbox rounded-md h-5 w-5 text-yellow-400"
               type="checkbox">
        <span class="ml-2  text-gray-100">
        Edition
      </span>
      </label>
      <label v-if="role" class="text-center" for="token">{{ role }}</label>
    </div>
  </div>

</template>

<script>
export default {
  name: "checkToken",
  data() {
    return {
      isValid: false,
      role: null,
      tempToken: null,
    }
  },
  mounted() {
    //Si le token existe déjà
    this.tempToken = this.token || null;
    this.isValid = !!this.tempToken || false;
  },
  methods: {
    tokenValidation() {
      if (this.tempToken) {
        fetch("http://127.0.0.1:8000/api/checkToken/", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.tempToken
          }
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
            .then(sentence => {
              this.role = sentence;
              this.isValid = true;
              this.$store.commit('isEditor', {token: this.tempToken});
            })
            .catch(e => {
              this.role = "☠️Aie☠️";
              this.isValid = false;
              this.$store.commit('isEditor', {token: null})
            });
      }
    }
  },
  computed: {
    token() {
      return this.$store.getters.getToken
    }
  }
}
</script>

<style scoped>
</style>
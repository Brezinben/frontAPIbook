<template>
  <div class="flex items-center space-x-5 mx-6">

    <div class="flex flex-col relative">
      <input id="token" v-model="tempToken" class="form__input max-w-xs" placeholder="token" type="text"
             @blur="tokenValidation">
      <label v-if="role" class="absolute hidden md:inline -bottom-1/2 left-0 right-0 mt-2 text-center text-gray-900"
             for="token">{{ role }}</label>
    </div>

    <div v-if="isValid" class="flex flex-col">
      <label class="inline-flex items-center cursor-pointer">
    <span class="relative">
      <span class="block w-10 h-6 bg-gray-200 rounded-full shadow-inner"></span>
      <span
          :class="toggler"
          class="absolute block w-4 h-4  rounded-full shadow inset-y-0 transform  ml-1 mt-1 duration-500 focus-within:shadow-outline">
        <input id="unchecked2" class="absolute opacity-0 w-0 h-0" type="checkbox"
               @click="$store.state.editing =!$store.state.editing"/>
      </span>
    </span>
        <span v-if="$store.state.editing" class="ml-3 text-sm mr-2 whitespace-nowrap">Edition 🔥</span>
        <span v-else class="ml-3 text-sm mr-2 whitespace-nowrap">Edition ❄</span>
      </label>
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
            .then(role => {
              this.role = `Vous êtes ${role}.`;
              this.isValid = true;
              this.$store.commit('isEditor', {token: this.tempToken, admin: role === "admin"});
            })
            .catch(e => {
              this.role = "☠️Aie☠️";
              this.isValid = false;
              this.$store.commit('isEditor', {token: null, admin: false})
            });
      } else {
        this.role = null;
        this.isValid = false;
        this.$store.commit('isEditor', {token: null, admin: false})
      }
    }
  },
  computed: {
    token() {
      return this.$store.getters.getToken
    },
    toggler() {
      return {
        'bg-gradient-to-r from-yellow-400  to-yellow-600   translate-x-full': this.$store.state.editing,
        'bg-gradient-to-r from-blue-400  to-blue-600  translate-x-0': !this.$store.state.editing,
      }
    },
  }
}
</script>

<style scoped>
</style>
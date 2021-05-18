<template>
  <div class="flex items-center space-x-5 mx-6">

    <div class="flex flex-col relative">
      <input id="token" v-model="tempToken" class="form__input max-w-xs" placeholder="token" type="text"
             @blur="tokenValidation">
      <label v-if="role" class="absolute hidden md:inline -bottom-1/2 left-4 text-center text-gray-900"
             for="token">{{ role }}</label>
    </div>

    <div v-if="isValid" class="flex flex-col">

      <transition name="fader">
        <!-- Partit checker-->
        <label v-if="$store.state.editing" class="inline-flex items-center cursor-pointer" for="checked">
    <span class="relative">
      <span class="block w-10 h-6 bg-gray-200 rounded-full shadow-inner"></span>
      <span
          class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-gradient-to-r from-yellow-400  to-yellow-600 transform translate-x-full">
        <input id="checked" class="absolute opacity-0 w-0 h-0" type="checkbox"
               @click="$store.state.editing =! $store.state.editing"/>
      </span>
    </span>
          <span class="ml-3 text-sm mr-2 whitespace-nowrap">Edition 🔥</span>
        </label>

        <label v-else class="inline-flex items-center cursor-pointer">
    <span class="relative">
      <span class="block w-10 h-6 bg-gray-200 rounded-full shadow-inner"></span>
      <span
          class="absolute block w-4 h-4 mt-1 ml-1 bg-gradient-to-r from-blue-400  to-blue-600 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out">
        <input id="unchecked" class="absolute opacity-0 w-0 h-0" type="checkbox"
               @click="$store.state.editing =!$store.state.editing"/>
      </span>
    </span>
          <span class="ml-3 text-sm mr-2 whitespace-nowrap">Edition ❄</span>
        </label>
      </transition>

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
.fader-enter,
.fader-enter-active,
.fader-enter-to,
.fader-leave,
.fader-leave-active,
.fader-leave-to {
  transition: all 0.3s;
}

.fader-enter,
.fader-enter-active,
.fader-enter-to,
.fader-leave,
.fader-leave-active,
.fader-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

</style>
<template>

  <div v-if="alert.show" :class="{
        'text-green-700 bg-green-100': alert?.type === 'created',
        'text-blue-700 bg-blue-100': alert?.type === 'updated' || alert?.type === 'deleted',
        'text-red-700 bg-red-100': alert?.type === 'error',
        'text-yellow-700 bg-yellow-100': alert?.type === 'warning',
      }" class="alert"
       role="alert">
    <p v-if="alert.header" class="font-bold">{{ alert.header }}</p>
    <p>{{ alert.message }}</p>

    <span class="absolute inset-y-0 right-0 flex items-center mr-4" @click="alert.show=!alert.show">
    <svg class="w-4 h-4 fill-current" role="button" viewBox="0 0 20 20"><path
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd" fill-rule="evenodd"></path></svg>
  </span>
  </div>

</template>

<script>
export default {
  name: "Alert",
  computed: {
    alert() {
      return this.$store.state.alert
    }
  }
}
</script>

<style scoped>
.alert {
  @apply relative py-3 pl-4 pr-10 leading-normal;
}
</style>
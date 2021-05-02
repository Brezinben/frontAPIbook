<template>

  <div v-if="alertStatus" class="alert" role="alert" :class="classStyle?classStyle:'text-yellow-700 bg-yellow-100'">
    <p v-if="firstMessage" class="font-bold">{{ firstMessage }}</p>
    <p>{{ alertStatus }}</p>

    <span @click="alertStatus = null" class="absolute inset-y-0 right-0 flex items-center mr-4">
    <svg class="w-4 h-4 fill-current" role="button" viewBox="0 0 20 20"><path
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd" fill-rule="evenodd"></path></svg>
  </span>

  </div>

</template>

<script>
export default {
  name: "Alert",
  props: ['alertStatus', 'firstMessage', 'classStyle']
}
</script>

<style scoped>
.alert {
  @apply relative py-3 pl-4 pr-10 leading-normal;
}
</style>
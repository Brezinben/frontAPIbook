<template>
  <div v-if="error" class="font-semibold text-red-500">{{ error }}</div>
</template>

<script>
export default {
  name: "FormErrorField",
  props: ['error']
}
</script>
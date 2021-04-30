<template>
  <div class="book__card">
    <div class="flex-shrink-0">
      <div class="w-12 mb-3  flex flex-col text-center leading-none">
        <span class="text-gray-400 pb-2 mb-2 border-b-2 border-gray-700">{{ publish_date.day }}</span>
        <span class="text-gray-400 pb-2 mb-2 border-b-2 border-gray-700">{{ publish_date.month }}</span>
        <span class="font-medium text-lg leading-none text-gray-300 title-font">{{ publish_date.year }}</span>
      </div>
      <router-link
          v-if="edition"
          class="bg-yellow-500 block text-white hover:bg-yellow-600 active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
          type="button"
          :to="{ name: 'editBook', params: { id: book.id }}">
        <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
             stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
          <line x1="16" y1="5" x2="19" y2="8"/>
        </svg>
      </router-link>
    </div>
    <div class="flex-grow pl-6 flex-col flex">
      <div class="flex items-center justify-between">
        <h2 @click="emitChangeCategory"
            class=" cursor-pointer tracking-widest text-xs title-font font-medium text-indigo-400 mb-1">
          {{ book.category.title }}
        </h2>
        <router-link
            v-if="edition"
            class="bg-indigo-500 block text-white hover:bg-indigo-600 active:bg-indigo-600 font-bold uppercase text-xs px-2 py-1 rounded-md shadow hover:shadow-md outline-none focus:outline-none -mt-3 ease-linear transition-all duration-150"
            type="button"
            :to="{ name: 'editCategory', params: { id: book.category.id }}">
          <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
               stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
            <line x1="16" y1="5" x2="19" y2="8"/>
          </svg>
        </router-link>
      </div>

      <h1 :title="book.title" class="title-font text-xl font-medium text-white mb-3">{{ title }}</h1>
      <span
          :class="statusClass"
          class=" mb-5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded">{{
          book.status.replace("_", " ").toUpperCase()
        }}</span>
      <a class="inline-flex items-center cursor-pointer" @click="emitChangeAuthor">
        <img alt="Une personne qui n'existe pas vraiment" src="https://thispersondoesnotexist.com/image"
             class="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center">
        <span class="flex-grow flex flex-col pl-3">
                <span class="title-font font-medium text-white">{{ fullName }}</span>
        </span>
        <router-link
            v-if="edition"
            class="bg-red-500 block text-white hover:bg-red-600 active:bg-red-600 font-bold uppercase text-xs px-2 py-1 rounded-md shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
            :to="{ name: 'editAuthor', params: { id: book.author.id }}">
          <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
               stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"/>
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"/>
            <line x1="16" y1="5" x2="19" y2="8"/>
          </svg>
        </router-link>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardBook",
  props: ["book", "edition"],
  mounted() {
    let d = new Date(this.book.publish_date);
    this.publish_date.day = new Intl.DateTimeFormat('fr', {day: '2-digit'}).format(d);
    this.publish_date.month = new Intl.DateTimeFormat('fr', {month: 'short'}).format(d);
    this.publish_date.year = new Intl.DateTimeFormat('fr', {year: 'numeric'}).format(d);
  },
  data() {
    return {
      fullName: this.book.author.first_name + " " + this.book.author.last_name,
      statusClass: {
        'text-green-100 bg-green-700': this.book.status === "disponible",
        'text-yellow-100 bg-yellow-500': this.book.status === "en_approvisionnement",
        'text-red-100 bg-red-700': this.book.status === "non_édité",
      },
      publish_date: {
        day: null,
        month: null,
        year: null,
      },
      title: this.book.title.length > 50 ? this.book.title.substr(0, 50) + '...' : this.book.title,
    }
  },
  methods: {
    emitChangeAuthor() {
      this.$emit('change-filter-author', {author: this.book.author.id})
    },
    emitChangeCategory() {
      this.$emit('change-filter-category', {category: this.book.category.id})
    }
  }
}
</script>

<style lang="scss" scoped>
.book__card {
  @apply py-8  px-4 rounded-sm flex items-start bg-gray-800 col-span-3;
  &:hover {
    transition-duration: 200ms;
    filter: drop-shadow(0px -3mm 10mm #060211);
  }
}

</style>
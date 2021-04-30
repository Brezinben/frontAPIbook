import {createStore} from 'vuex'

export default createStore({
    state: {
        books: null,
        categories: null,
        authors: null,
        error: null,
        updated: null,
        created:null
    },
    mutations: {
        hydrateBooks: (state, books) => state.books = books,
        hydrateCategories: (state, categories) => state.categories = categories,
        hydrateAuthors: (state, authors) => state.authors = authors,

        setError: (state, e) => state.error = e,
        setCreated: (state, c) => state.created = c,
        setUpdated: (state, u) => state.updated = u,
    },
    actions: {},
    modules: {},
    getters: {
        getBooks: (state) => state.books,
        getCategories: (state) => state.categories,
        getAuthors: (state) => state.authors
    }
})

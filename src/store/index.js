import {createStore} from 'vuex'

export default createStore({
    state: {
        //Contient les tableaux d'entité
        books: null,
        categories: null,
        authors: null,

        //Contient l'entité en cour de modification
        currentBook: null,
        currentCategory: null,
        currentAuthor: null,

        //les différents statue pour les erreus
        error: null,
        updated: null,
        created: null,

        //Header des requêtes axios
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer CCDENpQR0aX6hqBAARH0UbKk2tAtdf6pF8QrZb6N'
        }
    },
    mutations: {
        hydrateBooks: (state, books) => state.books = books,
        //Viens enlever la clé books en +
        hydrateCategories: (state, categories) => state.categories = categories.filter(c => c.books?.length).map(c => {
            delete c.books;
            return c;
        }),
        //Viens enlever la clé books en +
        hydrateAuthors: (state, authors) => state.authors = authors.filter(a => a.books?.length).map(a => {
            delete a.books;
            return a;
        }),


        setCurrentBook: (state, book) => state.currentBook = state.books.find(b => b.id === book.id),
        setCurrentCategory: (state, category) => state.currentCategories = state.categories.find(c => c.id === category.id),
        setCurrentAuthor: (state, author) => state.currentAuthors = state.authors.find(a => a.id === author.id),

        setError: (state, e) => state.error = e,
        setCreated: (state, c) => state.created = c,
        setUpdated: (state, u) => state.updated = u,
    },
    actions: {},
    modules: {},
    getters: {
        getBooks: (state) => state.books,
        getCategories: (state) => state.categories,
        getAuthors: (state) => state.authors,

        getCurrentBook: (state) => state.currentBook,
        getCurrentCategory: (state) => state.currentCategories,
        getCurrentAuthor: (state) => state.currentAuthors,
    }
})

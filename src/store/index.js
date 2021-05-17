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

        editor: false,
        editing: false,
        token: null,

        alert: {
            show: false,
            type: null,
            message: null,
            header: null,
        },

        errorsForm: [],

        //Header des requêtes axios
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this?.token}`,
        }
    },
    mutations: {
        isEditor: (state, payload) => {
            if (payload.token) {
                state.token = payload.token;
                state.editor = true;
            } else {
                state.token = null;
                state.editor = false;
            }
            state.editing = false
        },
        hydrateBooks: (state, books) => state.books = books,
        //Viens enlever la clé books en +
        hydrateCategories: (state, categories) => state.categories = categories.map(c => {
            delete c?.books;
            return c;
        }),
        //Viens enlever la clé books en +
        hydrateAuthors: (state, authors) => state.authors = authors.map(a => {
            delete a?.books;
            return a;
        }),


        setCurrentBook: (state, book) => state.currentBook = state.books.find(b => b.id === book.id),
        setCurrentCategory: (state, category) => state.currentCategories = state.categories.find(c => c.id === category.id),
        setCurrentAuthor: (state, author) => state.currentAuthors = state.authors.find(a => a.id === author.id),

        setAlert: (state, payload) => {
            state.alert = {
                show: true,
                type: payload.alert.type,
                message: payload.alert.message,
                header: payload.alert.header,
            }
        },

        setErrorFrom: (state, error) => {
            //Viens mettre en place les elements pour la comprehension du user
            let data = error.response.data;
            state.errorsForm = data.errors;
            state.alert = {
                show: true,
                type: 'error',
                message: data.message,
                header: "Erreur",
            };
        }
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

        isEditor: (state) => state.editor,
        isEditing: (state) => state.editing,
        getToken: (state) => state.token,
    }
})

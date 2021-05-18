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

        role: {
            editor: false,
            admin: false,
        },
        editing: false,
        token: null,

        alert: {
            show: false,
            type: null,
            message: null,
            header: null,
        },
        errorsForm: [],
    },
    mutations: {
        isEditor: (state, payload) => {
            const {token, admin} = payload;
            if (token) {
                state.token = token;
                state.role = {editor: true, admin: admin,};
            } else {
                state.token = null;
                state.role = {editor: false, admin: false,};
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
            const {type, message, header} = payload.alert;
            state.alert = {
                show: true,
                type: type,
                message: message,
                header: header,
            }
        },

        setErrorFrom: (state, error) => {
            //Viens mettre en place les elements pour la comprehension du user
            const data = error.response.data;
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

        isEditor: (state) => state.role.editor,
        isAdmin: (state) => state.role.admin,
        isEditing: (state) => state.editing,

        getToken: (state) => state.token,
        getHeaders: (state) => {
            return {
                'Accept': 'application/json',
                'Authorization': `Bearer ${state.token}`,
            }
        }
    }
})

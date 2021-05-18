import {createRouter, createWebHistory} from 'vue-router'

import Books from "@/views/Book/Books.vue";
import BooksAdd from "@/views/Book/BooksAdd.vue";
import BooksEdit from "@/views/Book/BooksEdit.vue";

import AuthorAdd from "@/views/Author/AuthorAdd.vue";
import AuthorEdit from "@/views/Author/AuthorEdit.vue";

import CategoryAdd from "@/views/Category/CategoryAdd.vue";
import CategoryEdit from "@/views/Category/CategoryEdit.vue";
import NotFound from "@/views/NotFound.vue";

import store from "../store/index"


const routes = [
    {
        path: '/',
        redirect: {name: 'books'}
    },
    {
        name: 'books',
        path: '/books',
        meta: {title: 'Les livres'},
        component: Books,
    },
    {
        name: "createBook",
        path: '/books/add',
        component: BooksAdd,
        meta: {title: 'Ajouter un livre', requiresAuth: true,},
    },
    {
        name: "editBook",
        path: '/books/edit/:id',
        component: BooksEdit,
        meta: {title: 'Modifier un livre', requiresAuth: true,},
    },
    {
        name: "createAuthor",
        path: '/authors/add',
        component: AuthorAdd,
        meta: {title: 'Ajouter un Auteur', requiresAuth: true,},
    },
    {
        name: "editAuthor",
        path: '/authors/edit/:id',
        component: AuthorEdit,
        meta: {title: 'Modifier un Auteur', requiresAuth: true,},
    },
    {
        name: "createCategory",
        path: '/categories/add',
        component: CategoryAdd,
        meta: {title: 'Ajouter une Catégorie', requiresAuth: true,},
    },
    {
        name: "editCategory",
        path: '/categories/edit/:id',
        component: CategoryEdit,
        meta: {title: 'Modifier une Catégorie', requiresAuth: true,},
    },

    {
        path: '/:path(.*)',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
//
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.state.role.editor) next()
        else {
            store.commit({
                type: 'setAlert',
                alert: {
                    type: 'warning',
                    message: "👹 Vous n'êtes pas Authentifier 👹",
                    header: "Attention!!",
                }
            });
            console.group()
            next({name: 'books'});
        }
    } else next()
})

export default router
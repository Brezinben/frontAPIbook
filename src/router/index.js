import {createRouter, createWebHistory} from 'vue-router'

import Books from "@/views/Book/Books.vue";
import BooksAdd from "@/views/Book/BooksAdd.vue";
import BooksEdit from "@/views/Book/BooksEdit.vue";

import AuthorAdd from "@/views/Author/AuthorAdd.vue";
import AuthorEdit from "@/views/Author/AuthorEdit.vue";

import CategoryAdd from "@/views/Category/CategoryAdd.vue";
import CategoryEdit from "@/views/Category/CategoryEdit.vue";

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
        meta: {title: 'Ajouter un livre'},
    },
    {
        name: "editBook",
        path: '/books/edit/:id',
        component: BooksEdit,
        meta: {title: 'Modifier un livre'},
    },


    {
        name: "createAuthor",
        path: '/authors/add',
        component: AuthorAdd,
        meta: {title: 'Ajouter un Auteur'},
    },
    {
        name: "editAuthor",
        path: '/authors/edit/:id',
        component: AuthorEdit,
        meta: {title: 'Modifier un Auteur'},
    },

    {
        name: "createCategory",
        path: '/categories/add',
        component: CategoryAdd,
        meta: {title: 'Ajouter une Catégorie'},
    },
    {
        name: "editCategory",
        path: '/categories/edit/:id',
        component: CategoryEdit,
        meta: {title: 'Modifier une Catégorie'},
    },

    {
        path: '/:path(.*)',
        component: Books
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
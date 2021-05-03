import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tw.css'
// global components

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
app.mixin({
    methods: {
        /**
         * @param {{Object}} obj1
         * @param {{Object}} obj2
         * @return boolean
         * @type function
         * */
        isEqual: (obj1, obj2) => {
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);
            //pas besoin de test si il n'ont pas les même attributs
            if (keys1.length !== keys2.length) return false;
            for (let key of keys1) {
                if (obj1[key] !== obj2[key]) return false;
            }
            return true;
        }
    }
})
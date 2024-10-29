import './assets/styles/general.scss'

// Importa Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'
// Importa Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle'


import { createApp } from 'vue';
import { router } from './router';

import App from './App.vue';

createApp(App).use(router).mount('#app')

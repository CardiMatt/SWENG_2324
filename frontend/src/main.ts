import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

// Importa VueFire e il modulo di autenticazione
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire';

// Importa la configurazione di Firebase
import { firebaseApp } from './firebase';

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
    components,
    directives,
  });

// Crea l'app Vue
const app = createApp(App);

// Configura VueFire con Firebase
app.use(VueFire, {
  firebaseApp, // Inizializza Firebase con l'app configurata
  modules: [
    VueFireFirestoreOptionsAPI(),
    VueFireAuth() // Abilita il supporto per l'autenticazione
  ],
});

// Vuetify
app.use(vuetify);

// Monta l'app
app.mount('#app');

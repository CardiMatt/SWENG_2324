import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

// Script per l'inserimento dei componenti
import './exposeVueComponents';

// Importa VueFire e il modulo di autenticazione
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire';

// Importa la configurazione di Firebase
import { firebaseApp } from './firebase';

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

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

declare global {
  interface Window {
    /**
     * Dispatches a MemoriTextEntered event to simulate a user typing a message
     * @param message The text message to send
     * @param waitForPrevious Whether to wait for the previous message to finish before sending (default true)
     * @param hidden Whether to hide the message from chat history (default false)
     * @param typingText Optional custom typing indicator text
     * @param useLoaderTextAsMsg Whether to use the loader text as the message (default false)
     * @param hasBatchQueued Whether there are more messages queued to be sent (default false)
     */
    typeMessage: (
      message: string,
      waitForPrevious?: boolean,
      hidden?: boolean,
      typingText?: string,
      useLoaderTextAsMsg?: boolean,
      hasBatchQueued?: boolean
    ) => void;

    typeBatchMessages: (
      messages: {
        message: string;
        waitForPrevious?: boolean;
        hidden?: boolean;
        typingText?: string;
        useLoaderTextAsMsg?: boolean;
      }[]
    ) => void;

    getMemoriState: (
      integrationId?: string,
    ) => object;

  }
}  

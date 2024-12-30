import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import SalutoComponent from './components/SalutoComponent.vue'
import LoginComponent from './components/LoginComponent.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Esponi Vue e il componente ColorPicker globalmente
window.Vue = createApp;
window.SalutoComponent = SalutoComponent;
window.LoginComponent = LoginComponent;
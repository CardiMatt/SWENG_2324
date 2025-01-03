import { createApp } from 'vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Logout from './components/Logout.vue';

// Funzione per montare i componenti Vue
function mountVueComponents(className, vueComponent) {
  const containers = document.querySelectorAll(`.${className}:not(.processed)`);

  containers.forEach((container) => {
    if (!container.classList.contains('processed')) {
      createApp(vueComponent).mount(container);
      container.classList.add('processed');
      console.log(`Componente Vue montato in ${container}`);
    }
  });
}

// Esportare la funzione e i componenti
window.mountVueComponents = mountVueComponents;
window.Login = Login;
window.Register = Register;
window.Logout = Logout;
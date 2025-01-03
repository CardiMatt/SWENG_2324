import { createApp } from 'vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Logout from './components/Logout.vue';

// Funzione per montare i componenti Vue
function mountVueComponentsInChat(className, vueComponent) {
  const containers = document.querySelectorAll(`.${className}:not(.processed)`);

  containers.forEach((container) => {
    if (!container.classList.contains('processed')) {
      createApp(vueComponent).mount(container);
      container.classList.add('processed');
      console.log(`Componente Vue montato in ${container}`);
    }
  });
}

function mountVueComponentsInExtention(vueComponent){
  const extension = document.getElementById("extension");
  extension.innerHTML = "";
  createApp(vueComponent).mount(extension);
}

function mountVueComponents(className, vueComponent){
  const containers = document.querySelectorAll(`.${className}:not(.processed)`);

  containers.forEach((container) => {
    if (!container.classList.contains('processed')) {
      createApp(vueComponent).mount(container);
      container.classList.add('processed');
      console.log(`Componente Vue montato in ${container}`);
    }
  });

  const extension = document.getElementById("extension");
  extension.innerHTML = "";
  createApp(vueComponent).mount(extension);
}

// Esportare la funzione e i componenti
window.mountVueComponents = mountVueComponents;
window.mountVueComponentsInChat = mountVueComponentsInChat;
window.mountVueComponentsInExtention = mountVueComponentsInExtention;
window.Login = Login;
window.Register = Register;
window.Logout = Logout;
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
  // Stile per il contenitore principale (extension)
  extension.style.position = "fixed";
  extension.style.top = "0";
  extension.style.left = "0";
  extension.style.width = "100%";
  extension.style.height = "100vh";
  extension.style.display = "flex";
  extension.style.justifyContent = "flex-start";
  extension.style.alignItems = "center";

  // Creazione del div interno
  const innerDiv = document.createElement("div");
  innerDiv.style.backgroundColor = "#ffffff"; // Sfondo bianco
  innerDiv.style.borderRadius = "8px"; // Angoli arrotondati (opzionale)
  innerDiv.style.width = "300px"; // Larghezza iniziale
  innerDiv.style.maxWidth = "80%"; // Adattabilità
  innerDiv.style.height = "auto"; // Altezza dinamica
  innerDiv.style.padding = "20px"; // Spaziatura interna
  innerDiv.style.marginLeft = "10%"; // Posizionamento centrato a sinistra

  // Aggiungi il div interno a "extension"
  extension.appendChild(innerDiv);

  // Monta il componente Vue all'interno del div interno
  createApp(vueComponent).mount(innerDiv);
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
  // Stile per il contenitore principale (extension)
  extension.style.position = "fixed";
  extension.style.top = "0";
  extension.style.left = "0";
  extension.style.width = "100%";
  extension.style.height = "100vh";
  extension.style.display = "flex";
  extension.style.justifyContent = "flex-start";
  extension.style.alignItems = "center";

  // Creazione del div interno
  const innerDiv = document.createElement("div");
  innerDiv.style.backgroundColor = "#ffffff"; // Sfondo bianco
  innerDiv.style.borderRadius = "8px"; // Angoli arrotondati (opzionale)
  innerDiv.style.width = "300px"; // Larghezza iniziale
  innerDiv.style.maxWidth = "80%"; // Adattabilità
  innerDiv.style.height = "auto"; // Altezza dinamica
  innerDiv.style.padding = "20px"; // Spaziatura interna
  innerDiv.style.marginLeft = "10%"; // Posizionamento centrato a sinistra

  // Aggiungi il div interno a "extension"
  extension.appendChild(innerDiv);

  // Monta il componente Vue all'interno del div interno
  createApp(vueComponent).mount(innerDiv);
}

// Esportare la funzione e i componenti
window.mountVueComponents = mountVueComponents;
window.mountVueComponentsInChat = mountVueComponentsInChat;
window.mountVueComponentsInExtention = mountVueComponentsInExtention;
window.Login = Login;
window.Register = Register;
window.Logout = Logout;
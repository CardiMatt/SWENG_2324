import { createApp } from 'vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Logout from './components/Logout.vue';
import Catalog from './components/Catalog.vue';
import CatalogCard from './components/CatalogCard.vue';
import SaveGame from './components/SaveGame.vue';
import BrowseSaves from './components/BrowseSaves.vue';
import BrowseCreatedStory from './components/BrowseCreatedStory.vue';
import BrowseCreatedStoryCard from './components/BrowseCreatedStoryCard.vue';
import BrowseCreatedStoryScenarios from './components/BrowseCreatedStoryScenarios.vue';
import CreateScenario from './components/CreateScenario.vue';
import CreateStory from './components/CreateStory.vue';

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

function unmountVueComponentsInChat(className) {
  const containers = document.querySelectorAll(`.${className}.processed`);

  containers.forEach((container) => {
    const app = container.__vue_app__; // Proprietà che contiene l'istanza Vue montata
    if (app) {
      app.unmount(); // Smonta l'app Vue
      delete container.__vue_app__; // Rimuove il riferimento all'istanza per evitare memory leaks
      container.classList.remove('processed'); // Rimuove il flag 'processed'
      console.log(`Componente Vue smontato da ${container}`);
    } else {
      console.warn(`Nessuna istanza Vue trovata per ${container}`);
    }
  });
}

function mountVueComponentsInExtention(vueComponent, props = {}) {
  const extension = document.getElementById("extension");

  // Resetta il contenuto e applica gli stili principali
  extension.innerHTML = "";
  extension.style.position = "fixed";
  extension.style.top = "120px"; // Posiziona l'elemento in alto
  extension.style.left = "30px"; // Posiziona l'elemento a sinistra
  extension.style.width = "600px"; // Dimensione più controllata
  extension.style.height = "80vh"; // Altezza massima
  extension.style.backgroundColor = "#ffffff"; // Sfondo bianco
  extension.style.border = "1px solid #ddd"; // Bordo per separare visivamente
  extension.style.borderRadius = "8px"; // Angoli arrotondati
  extension.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)"; // Ombra
  extension.style.padding = "15px"; // Spaziatura interna
  extension.style.overflowY = "auto"; // Scroll se il contenuto è troppo grande
  extension.style.overflowX = "auto"; // Scroll se il contenuto è troppo grande
  extension.style.zIndex = "9999"; // In primo piano

  // Creazione del div interno
  const innerDiv = document.createElement("div");
  innerDiv.style.width = "100%"; // Riempie il contenitore
  innerDiv.style.height = "auto"; // Altezza dinamica

  // Aggiungi il div interno al contenitore principale
  extension.appendChild(innerDiv);

  // Monta il componente Vue all'interno del div interno
  createApp(vueComponent, props).mount(innerDiv);
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

}

function unmountVueComponentsInExtention(vueComponent){
  const extension = document.getElementById("extension");
  extension.innerHTML = "";
  extension.style.zIndex = "-200";
}

// Esportare la funzione e i componenti
window.mountVueComponents = mountVueComponents;
window.mountVueComponentsInChat = mountVueComponentsInChat;
window.mountVueComponentsInExtention = mountVueComponentsInExtention;
window.unmountVueComponentsInChat = unmountVueComponentsInChat;
window.unmountVueComponentsInExtention = unmountVueComponentsInExtention; BrowseSaves
window.Login = Login;
window.Register = Register;
window.Logout = Logout;
window.Catalog = Catalog;
window.CatalogCard = CatalogCard;
window.SaveGame = SaveGame;
window.CreateStory = CreateStory;
window.CreateScenario = CreateScenario;
window.BrowseSaves = BrowseSaves;
window.BrowseCreatedStory = BrowseCreatedStory;
window.BrowseCreatedStoryCard = BrowseCreatedStoryCard;
window.BrowseCreatedStoryScenarios = BrowseCreatedStoryScenarios;
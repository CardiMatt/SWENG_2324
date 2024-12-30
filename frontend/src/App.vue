<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

// Import per il componente SalutoComponent
import { createApp } from 'vue';
import SalutoComponent from './components/SalutoComponent.vue';

// Funzione per montare i componenti Vue
function mountVueComponents(className: string, vueComponent: any): void {
  const containers = document.querySelectorAll(`.${className}:not(.processed)`);

  containers.forEach((container) => {
    if (!container.classList.contains('processed')) {
      createApp(vueComponent).mount(container);
      container.classList.add('processed');
      console.log(`Componente Vue montato in ${container}`);
    }
  });
}

// Esporre la funzione e il componente Vue globalmente su window
window.mountVueComponents = mountVueComponents;
window.SalutoComponent = SalutoComponent;
</script>



<template>
  <header>

  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<!-- <RouterView />   vs <router-view /> 
  Vue li riconosce entrambi.
  <RouterView /> 
    (PascalCase), spesso usato nel file .vue, consigliato
  <router-view /> 
    (kebab-case), più comune nei file HTML o nei vecchi progetti Vue
  -->
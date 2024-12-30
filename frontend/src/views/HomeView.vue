<script setup lang="ts">
import MemoriComponent from '@/components/MemoriComponent.vue';

//import dei componenti
</script>

<template>
  <main class="home-container">
    <div class="login-container">
      <router-link to="/login" class="login-button">Accedi</router-link>
    </div>

    <!--tag componenti per visualizzazine-->
    <MemoriComponent/>
    
  </main>
</template>

<style scoped>

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
  background-color: #f4f4f4;
}

/* Bottone Accedi/Registrati */
.login-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.login-button {
  padding: 0.8rem 1.6rem;
  font-size: 1.1rem;
  background-color: #0066cc; /* Puoi cambiare il colore */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #004d99;
}


</style>

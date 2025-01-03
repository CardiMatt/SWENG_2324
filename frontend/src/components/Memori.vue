<template>
    <!-- Web Component di Memori -->
    <memori-client
        memoriName="Adventures Master"
        ownerUserName="matteocardinale2002"
        memoriID="fa22537f-6cd4-45f9-b21e-347747222db6"
        ownerUserID="fcfa7ae4-aedc-4a52-a137-4d2a858d6561"
        tenantID="www.aisuru.com"
        apiURL="https://backend.memori.ai"
        engineURL="https://engine.memori.ai"
        baseURL="https://www.aisuru.com"
        uiLang="IT"
        spokenLang="IT"
        layout="TOTEM"
        multilingual="true"
        showShare="true"
        integrationID="5f2ab2ab-5574-4ec6-9034-fd5fb948a449"
        initialQuestion="Login"
    ></memori-client>
</template>
  <style>
      /* Memori component: adattamento alle dimensioni della pagina */
  .memori-component {
    width: 100%;
    height: 80%;
    max-width: 100vw; /* Evita che il componente esca dalla larghezza */
    max-height: 100vh; /* Adatta la dimensione del componente alla larghezza e altezza della pagina */
    
  }
  .memori--global-background {
      pointer-events: none; /* Disabilita l'interazione con il background */
  }
  
  </style>
  
  <script setup lang="ts">
  </script>
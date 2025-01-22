<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Adventures Master</v-toolbar-title>
      <v-spacer></v-spacer>
      <SaveGame />
      <!-- inserire pulsante per salvare e per fare logout -->
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Colonna sinistra -->
          <v-col cols="12" md="6" class="left-column">
            <!-- Qui puoi aggiungere contenuto o pulsanti di test -->
          </v-col>

          <!-- Colonna destra -->
          <v-col cols="12" md="12" class="memori-container">
            <!-- ESEMPIO 1: Passare solo memoriConfig -->
            <Memori :memoriConfig="someMemoriConfig" /> 
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Memori from "./components/Memori.vue";
import SaveGame from './components/SaveGame.vue';


// Import dei tipi
import type { MemoriConfig, GameSave } from "@/models/GameSave";

export default defineComponent({
  name: "App",
  components: {
    Memori,
    SaveGame,
  },
  setup() {
    // Esempio di MemoriConfig
    const someMemoriConfig = ref<MemoriConfig>({
      context: "AUTH:NON_AUTENTICATO,STORIA: NULL",
      initialQuestion: "Benvenuto"
    });
    
    return {
      someMemoriConfig,
    };
  },
});
</script>

<style scoped>
.left-column {
  padding: 16px;
}

.dynamic-content {
  height: 50px; /* Altezza placeholder */
  border: 1px dashed #ccc;
  margin-bottom: 16px;
}

.memori-container {
  padding: 16px;
  border-left: 1px solid #ccc; /* Separatore tra le due colonne */
}
</style>

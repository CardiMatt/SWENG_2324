<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Adventures Master</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>

          <!-- Colonna sinistra -->
          <v-col cols="12" md="6" class="left-column">
          </v-col>

          <!-- Colonna destra -->
          <v-col cols="12" md="6" class="memori-container">
            <Memori />
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Memori from "./components/Memori.vue";

  export default defineComponent({
    name: "App",
    components: {
      Memori,
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

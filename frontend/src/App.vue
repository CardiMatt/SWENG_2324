<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>SWENG 2023/2024</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Colonna sinistra vuota -->
          <v-col cols="12" md="4">
            <p>Ciao</p>
          </v-col>
          
          <!-- Colonna centrale con Memori -->
          <v-col cols="12" md="7" class="d-flex justify-center align-center">
            <div class="memori-container">
              <Memori />
            </div>
          </v-col>
          <!-- Colonna destra vuota -->
          <v-col cols="12" md="1"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Memori from "./components/Memori.vue";

export default defineComponent({
  name: "App",
  components: {
    Login,
    Register,
    Memori,
  },
  setup() {
    const currentView = ref<"login" | "register">("login");

    return {
      currentView,
    };
  },
});
</script>

<style scoped>
.dynamic-components-container {
  padding: 16px;
}

.memori-container {
  width: 100%; /* O aggiusta a una dimensione specifica */
  max-width: 600px; /* Limita la larghezza massima */
}

.memori-container {
  padding: 16px;
  border-left: 1px solid #ccc; /* Separatore tra le due colonne */
}
</style>

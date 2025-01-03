<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Gestione Utenti</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Colonna sinistra per i componenti dinamici -->
          <v-col cols="12" md="6" class="dynamic-components-container">
            <v-card>
              <v-card-title>
                <v-btn @click="currentView = 'login'" :color="currentView === 'login' ? 'primary' : 'grey'">
                  Login
                </v-btn>
                <v-btn @click="currentView = 'register'" :color="currentView === 'register' ? 'primary' : 'grey'">
                  Registrazione
                </v-btn>
              </v-card-title>
              <v-card-text>
                <div v-if="currentView === 'login'">
                  <Login />
                </div>
                <div v-else-if="currentView === 'register'">
                  <Register />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <!-- Colonna destra con il componente Memori -->
          <v-col cols="12" md="6" class="memori-container">
            <Memori />
          </v-col>
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
  padding: 16px;
  border-left: 1px solid #ccc; /* Separatore tra le due colonne */
}
</style>

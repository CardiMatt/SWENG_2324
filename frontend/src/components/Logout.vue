<!-- frontend/src/components/Logout.vue -->
<template>
  <button class="btn btn-danger" @click="logout" v-if="userId">Logout</button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { LogRepository } from "../repositories/LogRepository";
import eventBus from "@/eventBus"; // Importa l'event bus

export default defineComponent({
  name: "Logout",
  setup() {
    const userId = ref<string | null>(null);

    const logout = async () => {
      try {
        if (userId.value) {
          // Salva un log di logout
          await LogRepository.saveLog({
            userId: userId.value,
            timestamp: new Date(),
            action: "User logged out",
          });
        }

        await signOut(auth);
        alert("Logout effettuato con successo!");

        // Definisci la configurazione predefinita di Memori
        const defaultMemoriConfig = {
          context: 'AUTH:NON_AUTENTICATO,STORIA:NULL',
          initialQuestion: 'Benvenuto',
        };

        // Emetti l'evento per resettare Memori.vue
        eventBus.emit('updateMemoriConfig', defaultMemoriConfig);

      } catch (err) {
        console.error("Errore durante il logout:", err);
      }
    };

    onMounted(() => {
      // Listener per monitorare lo stato dell’autenticazione
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        userId.value = user ? user.uid : null;
      });

      // Rimuove il listener quando il componente viene smontato
      onUnmounted(() => {
        unsubscribe();
      });
    });

    return { 
      logout,
      userId,
    };
  },
});
</script>

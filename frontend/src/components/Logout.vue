<!-- frontend/src/components/Logout.vue -->
<template>
  <button class="btn btn-danger" @click="logout">Logout</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { LogRepository } from "../repositories/LogRepository";
import eventBus from "@/eventBus"; // Importa l'event bus

export default defineComponent({
  name: "Logout",
  setup() {
    const logout = async () => {
      try {
        const userId = auth.currentUser?.uid;

        // Salva un log di logout
        if (userId) {
          await LogRepository.saveLog({
            userId,
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

    return { logout };
  },
});
</script>

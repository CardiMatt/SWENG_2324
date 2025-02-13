<!-- frontend\src\components\SaveGame.vue -->
<template>
  <div v-if="storyId !== 'NULL'" class="save-game">
    <!-- Bottone per salvare il progresso della storia, disabilitato durante il salvataggio -->
    <button class="btn btn-success" @click="saveProgress" :disabled="isSaving">
      {{ isSaving ? 'Salvataggio...' : 'Salva' }}
    </button>  
    <!-- Messaggio di errore in caso di fallimento del salvataggio -->
    <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { GameSaveRepository } from '@/repositories/GameSaveRepository';
import type { GameSave } from '@/models/GameSave';
import type { MemoriConfig } from '@/models/GameSave';
import { auth } from "../firebase";  // Autenticazione utente tramite Firebase
import { AisuruService } from '@/services/AisuruService';  // Servizi di interazione con Aisuru

export default defineComponent({
  name: 'SaveGame',
  setup() {
    const isSaving = ref(false);  // Stato di salvataggio
    const errorMessage = ref('');  // Messaggio di errore
    const storyId = ref<string>('NULL');  // ID della storia corrente

    // Recupero dello stato corrente da Memori
    const fetchMemoriState = async () => {
      try {
        const memoriState: any = await window.getMemoriState();
        const contextVarsString = JSON.stringify(memoriState.contextVars);
        const parsedContextVars = JSON.parse(contextVarsString);
        storyId.value = parsedContextVars.STORIA || 'NULL';  // Assegnazione ID storia
        console.log(storyId.value);
      } catch (error) {
        console.error("Errore nel recupero dello stato Memori:", error);
      }
    }; 

    // Funzione per salvare il progresso della storia
    const saveProgress = async () => {
      if (storyId.value === "NULL") return;  // Verifica validità ID storia

      isSaving.value = true;
      errorMessage.value = '';

      try {
        let aisuruService: AisuruService = new AisuruService();

        const userId = auth.currentUser?.uid;  // Recupero ID utente corrente
        if (!userId) {
          throw new Error('User not authenticated');  // Errore se l'utente non è autenticato
        }

        const memoriState: any = await window.getMemoriState();  // Stato attuale da Memori
        const { lastMatchedMemoryID, contextVars } = memoriState;
        const parsedContextVars = JSON.parse(JSON.stringify(contextVars));

        // Formattazione delle variabili di contesto escludendo alcune non necessarie
        const formattedContextVars = Object.entries(parsedContextVars)
          .filter(([key]) => key !== 'PATHNAME' && key !== 'ROUTE')
          .map(([key, value]) => `${key}:${value}`)
          .join(',');

        const progress = parsedContextVars.SCENARIO || 'default-progress';  // SCENARIO corrente
        const inventoryItems = [];
        for (let i = 1; i <= 5; i++) {  // Recupero elementi inventario
          const item = parsedContextVars[`OGGETTON${i}`];
          if (item) {
            inventoryItems.push(item);
          }
        }
        const inventory = inventoryItems.join(', ');

        const matchedMemory: any = await aisuruService.getMemory(
          String(lastMatchedMemoryID)
        );

        const memoriConfig: MemoriConfig = {
          context: formattedContextVars,
          initialQuestion: matchedMemory.memory.title  // Titolo della memoria corrispondente
        };

        // Chiamata a GameSaveRepository per salvare i dati
        const docId = await GameSaveRepository.saveGameSave({
          userId: userId,
          storyId: storyId.value,
          progress: progress,
          inventory: inventory,
          saveDate: new Date(),
          memoriConfig: memoriConfig, 
        });

        alert(`Salvataggio completato! ID generato: ${docId}`);
      } catch (err) {
        console.error('Errore nel salvataggio:', err);
        errorMessage.value = 'Errore durante il salvataggio. Riprova.';
      } finally {
        isSaving.value = false;
      }
    };

    // Gestione dell'evento di cambio stato di Memori
    onMounted(async () => {
      await fetchMemoriState();
      document.addEventListener('MemoriNewDialogState', (e: any) => {
        console.log('Memori state changed:', e.detail);
        fetchMemoriState();
      });
    });

    return {
      saveProgress,
      isSaving,
      errorMessage,
      storyId
    };
  },
});
</script>

<style scoped>
.save-game {
  margin: 20px;
}
</style>

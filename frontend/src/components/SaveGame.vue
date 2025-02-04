<!-- frontend\src\components\SaveGame.vue -->
<template>
  <div class="save-game">
    <button class="btn btn-success" @click="saveProgress" :disabled="isSaving">
      {{ isSaving ? 'Salvataggio...' : 'Salva' }}
    </button>  
    <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { GameSaveRepository } from '@/repositories/GameSaveRepository';
import type { GameSave } from '@/models/GameSave';
import type { MemoriConfig } from '@/models/GameSave';
import { auth } from "../firebase";
import { AisuruService } from '@/services/AisuruService';

export default defineComponent({
  name: 'SaveGame',
  setup() {
    const isSaving = ref(false);
    const errorMessage = ref('');

    const saveProgress = async () => {
      isSaving.value = true;
      errorMessage.value = '';
      // storyId --> contesto storia
      // scenario --> contesto scenario
      // initialMessage (ultimo messaggio inviato dall'utente)

      try {
        let aisuruService: AisuruService;
        aisuruService = new AisuruService();

        // Recupera userId da Firebase Auth
        const userId = auth.currentUser?.uid;
        if (!userId) {
          throw new Error('User not authenticated');
        }
        // Otteniamo l'ID generato
        const memoriState: any = await window.getMemoriState();
        const { lastMatchedMemoryID } = memoriState;
        const { contextVars } = memoriState;
        
        // Crea una nuova variabile per memorizzare il valore come stringa
        const contextVarsString = typeof contextVars === "string"
          ? contextVars
          : JSON.stringify(contextVars);

        console.log(contextVarsString);

        // Converte la stringa JSON in un oggetto JavaScript
        const parsedContextVars = JSON.parse(contextVarsString);

        // Crea la stringa formattata 'CHIAVE:VALORE,CHIAVE2:VALORE2,...' escludendo PATHNAME e ROUTE
        const formattedContextVars = Object.entries(parsedContextVars)
          .filter(([key]) => key !== 'PATHNAME' && key !== 'ROUTE')
          .map(([key, value]) => `${key}:${value}`)
          .join(',');

        console.log(formattedContextVars);
        
        // Accedi direttamente alle proprietà
        const storyId = parsedContextVars.STORIA || 'default-story-id';
        const progress = parsedContextVars.SCENARIO || 'default-progress';
        const inventoryItems = [];
        for (let i = 1; i <= 5; i++) {
          const item = parsedContextVars[`OGGETTON${i}`];
          if (item) {
            inventoryItems.push(item);
          }
        }
        const inventory = inventoryItems.join(', ');
        console.log(contextVarsString);

        // Ottieni il Memory associato
        const matchedMemory: any = await aisuruService.getMemory(
          typeof lastMatchedMemoryID === 'string'
          ? lastMatchedMemoryID
          : String(lastMatchedMemoryID)
        );
        
        const memoriConfig: MemoriConfig = {
          context: formattedContextVars, // prende tutte le contextVars tranne ROUTE e PATHNAME
          initialQuestion: matchedMemory.memory.title // Accedi al titolo all'interno della proprietà memory
        };

        const docId = await GameSaveRepository.saveGameSave({
        userId: userId,
        storyId: storyId,
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

    return {
      saveProgress,
      isSaving,
      errorMessage,
    };
  },
});
</script>

<style scoped>
.save-game {
  margin: 20px;
}
</style>


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
        const lastMemoryIDString = typeof lastMatchedMemoryID === "string"
            ? lastMatchedMemoryID
            : String(lastMatchedMemoryID);
        const contextVarsString = typeof contextVars === "string"
          ? contextVars
          : JSON.stringify(contextVars);

        console.log(contextVarsString);

          // Estrai i parametri necessari da contextVarsString
        const storyId = contextVarsString.match(/STORIA: ([^;]+)/)?.[1] || 'default-story-id';
        const progress = contextVarsString.match(/SCENARIO: ([^;]+)/)?.[1] || 'default-progress';
        const inventoryMatches = contextVarsString.match(/OGGETTON\d: ([^;]+)/g) || [];
        const inventory = inventoryMatches
          .map((item) => item.match(/OGGETTON\d: ([^;]+)/)?.[1])
          .filter(Boolean) // Filtra eventuali valori null o undefined
          .slice(0, 5) // Limita a 5 oggetti
          .join(', '); // Unisci in una stringa separata da virgole

        // Ottieni il Memory associato
        const matchedMemory: any = await aisuruService.getMemory(
          typeof lastMatchedMemoryID === 'string'
          ? lastMatchedMemoryID
          : String(lastMatchedMemoryID)
        );
        
        const memoriConfig: MemoriConfig = {
          context: progress, // Usa progress per il campo context
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


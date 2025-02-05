<template>
  <div v-if="storyId !== 'NULL'" class="save-game">
    <button class="btn btn-success" @click="saveProgress" :disabled="isSaving">
      {{ isSaving ? 'Salvataggio...' : 'Salva' }}
    </button>  
    <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
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
    const storyId = ref<string>('NULL');

    const fetchMemoriState = async () => {
      try {
        const memoriState: any = await window.getMemoriState();
        const contextVarsString = JSON.stringify(memoriState.contextVars);
        const parsedContextVars = JSON.parse(contextVarsString);
        storyId.value = parsedContextVars.STORIA || 'NULL';
        console.log(storyId.value);
      } catch (error) {
        console.error("Errore nel recupero dello stato Memori:", error);
      }
    }; 

    const saveProgress = async () => {
      if (storyId.value === "NULL") return;

      isSaving.value = true;
      errorMessage.value = '';

      try {
        let aisuruService: AisuruService = new AisuruService();

        const userId = auth.currentUser?.uid;
        if (!userId) {
          throw new Error('User not authenticated');
        }

        const memoriState: any = await window.getMemoriState();
        const { lastMatchedMemoryID, contextVars } = memoriState;
        const parsedContextVars = JSON.parse(JSON.stringify(contextVars));

        const formattedContextVars = Object.entries(parsedContextVars)
          .filter(([key]) => key !== 'PATHNAME' && key !== 'ROUTE')
          .map(([key, value]) => `${key}:${value}`)
          .join(',');

        const progress = parsedContextVars.SCENARIO || 'default-progress';
        const inventoryItems = [];
        for (let i = 1; i <= 5; i++) {
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
          initialQuestion: matchedMemory.memory.title
        };

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

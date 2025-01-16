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
// import type { GameSave } from '@/models/GameSave';

export default defineComponent({
  name: 'SaveGame',
  props: {
    userId: {
      type: String,
      required: true,
    },
    storyId: {
      type: String,
      required: true,
    },
    progress: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    inventory: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isSaving = ref(false);
    const errorMessage = ref('');

    const saveProgress = async () => {
      isSaving.value = true;
      errorMessage.value = '';

      try {
        // Otteniamo l'ID generato
        const docId = await GameSaveRepository.saveGameSave({
        userId: props.userId,
        storyId: props.storyId,
        progress: props.progress,
        state: props.state,
        inventory: props.inventory,
        saveDate: new Date(),
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


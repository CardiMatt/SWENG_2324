<template>
    <div class="save-game">
      <h2>Salva Partita</h2>
      <button @click="saveProgress" :disabled="isSaving">
        {{ isSaving ? 'Salvataggio...' : 'Salva' }}
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { GameSaveRepository } from '@/repositories/GameSaveRepository';
  import type { GameSave } from '@/models/GameSave';
  import { v4 as uuidv4 } from 'uuid';
  //TODO scegliere se usare uuid (generatore id univoci di javascript o funzione firebase add(). vantaggio uuid gestire tutto localmente)
  
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

      // const gameSave: GameSave = {
      //   id: uuidv4(),
      //   userId: props.userId,
      //   storyId: props.storyId,
      //   progress: props.progress,
      //   saveDate: new Date(),
      //   state: props.state,
      //   inventory: props.inventory,
      // };

      
      const gameSave: GameSave = {
        id: uuidv4(),
        userId: 'user1',
        storyId: 'story1',
        progress: 'new',
        saveDate: new Date(),
        state: 'new',
        inventory: 'empty',
      };

      try {
        await GameSaveRepository.saveGameSave(gameSave);
        alert('Salvataggio completato!');
      } catch (error) {
        console.error('Errore nel salvataggio:', error);
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

  /*
      async saveProgress() {
        const gameSave: GameSave = {
            id: uuidv4(),
            userId: this.userId,
            storyId: this.storyId,
            progress: this.progress,
            saveDate: new Date(),
            state: this.state,
            inventory: this.inventory
        };
  
        await GameSaveRepository.saveGameSave(gameSave);
        alert('Salvataggio completato!');
      },
    },
  });*/
  </script>
  
  <style scoped>
  .save-game {
    margin: 20px;
  }
  button {
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  button:hover {
    background-color: #27ae60;
  }
  </style>
  
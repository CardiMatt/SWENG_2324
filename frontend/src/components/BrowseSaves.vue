<!-- frontend\src\components\BrowseSaves.vue -->
<template>
  <div class="browse-saves container mt-4">
    <h2 class="mb-3">Salvataggi</h2>
    <ul class="list-group">
      <li v-for="save in saves" :key="save.id" class="list-group-item">
        <p><strong>Storia:</strong> {{ save.storyId }}</p>
        <p><strong>Progresso:</strong> {{ save.progress }}</p>
        <p><strong>Data:</strong> {{ new Date(save.saveDate).toLocaleString() }}</p>
        <p><strong>Inventario:</strong> {{ save.inventory }}</p>
        <!-- Bottone per caricare il salvataggio -->
        <button @click="loadSave(save)" class="btn btn-primary">Carica</button>
        <!-- Bottone per eliminare il salvataggio -->
        <button @click="deleteSave(save.id)" class="btn btn-danger ms-2">Elimina salvataggio</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { GameSaveRepository } from '@/repositories/GameSaveRepository';
import type { GameSave } from '@/models/GameSave';
import eventBus from '@/eventBus';
import { auth } from '../firebase';

export default defineComponent({
  name: 'BrowseSaves',
  setup() {
    const saves = ref<GameSave[]>([]);

    const userId = auth.currentUser?.uid;
    if (userId) {
      // Carica i salvataggi dell'utente
      onMounted(async () => {
        saves.value = await GameSaveRepository.getGameSavesByUserId(userId);
      });
    }

    const loadSave = (save: GameSave) => {
      const memoriConfig = save.memoriConfig;
      if (memoriConfig) {
        eventBus.emit('updateMemoriConfig', memoriConfig);
      } else {
        console.error('La configurazione di Memori non è valida.');
      }
    };

    const deleteSave = async (id: string) => {
      if (id) {
        await GameSaveRepository.deleteGameSaveById(id);
        saves.value = saves.value.filter(save => save.id !== id); // Aggiorna la lista
      } else {
        console.error('ID del salvataggio non valido');
      }
    };

    return {
      saves,
      loadSave,
      deleteSave,
    };
  },
});
</script>

<style scoped>
.browse-saves {
  margin: 20px;
}
.list-group-item {
  background: #f8f9fa;
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

<!-- frontend\src\components\BrowseSaves.vue -->
<template>
  <div class="browse-saves">
    <h2>Salvataggi</h2>
    <ul>
      <li v-for="save in saves" :key="save.id">
        <p><strong>Storia:</strong> {{ save.storyId }}</p>
        <p><strong>Progresso:</strong> {{ save.progress }}</p>
        <p><strong>Data:</strong> {{ new Date(save.saveDate).toLocaleString() }}</p>
        <p><strong>Stato:</strong> {{ save.state }}</p>
        <p><strong>Inventario:</strong> {{ save.inventory }}</p>
        <!-- Bottone per caricare il salvataggio -->
        <button @click="loadSave(save)">Carica</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { GameSaveRepository } from '@/repositories/GameSaveRepository';
import type { GameSave } from '@/models/GameSave';
import eventBus from '@/eventBus';

export default defineComponent({
  name: 'BrowseSaves',
  setup() {
    const saves = ref<GameSave[]>([]);

    // Carica i salvataggi dell'utente
    onMounted(async () => {
      saves.value = await GameSaveRepository.getFakeGameSave();
    });

    const loadSave = (save: GameSave) => {
      const memoriConfig = save.memoriConfig;
      if (memoriConfig) {
        eventBus.emit('updateMemoriConfig', memoriConfig);
      } else {
        console.error('La configurazione di Memori non è valida.');
      }
    };

    return {
      saves,
      loadSave,
    };
  },
});
</script>

<style scoped>
.browse-saves {
  margin: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f4f4f4;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
}
button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>

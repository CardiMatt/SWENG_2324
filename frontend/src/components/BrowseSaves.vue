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
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { GameSaveRepository } from '@/repositories/GameSaveRepository';
  import type { GameSave } from '@/models/GameSave';
  
  export default defineComponent({
    name: 'BrowseSaves',
    props: {
      userId: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const saves = ref<GameSave[]>([]);
  
      onMounted(async () => {
        saves.value = await GameSaveRepository.getGameSavesByUserId(props.userId);
      });
  
      return {
        saves,
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
  </style>
  
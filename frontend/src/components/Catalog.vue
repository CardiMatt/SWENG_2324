<template>
    <div class="browsing-stories">
      <div v-for="story in stories" :key="story.id" class="story-card">
        <div class="card-background" :style="{ backgroundImage: `url(${story.image})`, opacity: '0.8' }">
          <h2 class="story-title">{{ story.title }}</h2>
          <p class="story-description">
            {{ story.description.slice(0, 100) }}...
            <span class="read-more" @click="openPopup(story)">Vedi di più</span>
          </p>
          <p class="story-meta">Di {{ story.author }} | Genere: {{ story.genre }}</p>
          <button class="play-story" @click="playStory(story.id)">Gioca Storia</button>
        </div>
      </div>
  
      <div v-if="selectedStory" class="story-popup" @click="closePopup">
        <div class="popup-content" @click.stop>
          <h2>{{ selectedStory.title }}</h2>
          <p>{{ selectedStory.description }}</p>
          <button @click="closePopup">Chiudi</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { fetchStories } from '@/services/storyService';
  import { type Story } from '@/models/Story';
  
  export default defineComponent({
    name: 'Catalog',
    setup() {
      const stories  =ref<Story[]>(fetchStories());
      const selectedStory = ref<Story | null>(null); //permetto che sia null inizialmente, all'inizio non è selezionata nessuna storia
  
      const openPopup = (story: any) => {
        selectedStory.value = story;
      };
  
      const closePopup = () => {
        selectedStory.value = null;
      };
  
      const playStory = (storyId: number) => {
        console.log(`Playing story with ID: ${storyId}`);
      };
  
      return {
        stories,
        selectedStory,
        openPopup,
        closePopup,
        playStory,
      };
    },
  });
  </script>
  
  <style scoped>
  .browsing-stories {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .story-card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 300px;
    display: flex;
    flex-direction: column;
  }
  
  .card-background {
    background-size: cover;
    background-position: center;
    padding: 16px;
    color: white;
    position: relative;
  }
  
  .story-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .story-description {
    margin: 12px 0;
    font-size: 0.9rem;
  }
  
  .read-more {
    color: #3498db;
    cursor: pointer;
    text-decoration: underline;
  }
  
  .story-meta {
    font-size: 0.8rem;
    color: #dddddd;
  }
  
  .play-story {
    background: #2ecc70;
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
    text-align: center;
    font-size: 1rem;
    width: 100%;
  }
  
  .story-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 1000;
    cursor: pointer; /* cliccabile */
  }
  
  .popup-content {
    background: #333;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    cursor: default;
  }
  </style>
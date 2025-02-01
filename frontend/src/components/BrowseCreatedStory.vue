<!--Componente di browse delle storie create con possibilità di modifica e 
accesso a componente di creazione storia -->

<template>
    <div class="main-container">
      <div class="filters-container mb-4">
        <div class="filters-row">
          <div class="filter-item">
            <label for="filter-genre" class="form-label">Genere</label>
            <select v-model="filters.genre" id="filter-genre" class="form-select">
              <option value="">Tutti</option>
              <option v-for="genre in uniqueGenres" :key="genre" :value="genre">{{ genre }}</option>
            </select>
          </div>
          <div class="filter-item">
            <label for="filter-title" class="form-label">Titolo</label>
            <input v-model="filters.title" type="text" id="filter-title" class="form-control" placeholder="Inserisci titolo">
          </div>
        </div>
      </div>
  
      <div class="catalog-container">
        <div class="catalog-grid">
            <!--TODO-->
          <CatalogCard 
            v-for="story in filteredStories" 
            :key="story.id" 
            :story="story" 
            @open-popup="openPopup"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, computed } from 'vue';
  import CatalogCard from './CatalogCard.vue';
  import { StoryRepository } from '../repositories/StoryRepository';
  
  export default defineComponent({
    name: 'BrowseCreatedStory',
    components: {
      CatalogCard,
    },
    setup() {
      const stories = ref([]);
      const selectedStory = ref(null);
      const filters = ref({
        genre: '',
        title: '',
      });
  
      // Fetch stories from repository
      //TODO
      StoryRepository.getAllStories().then((data) => {
        stories.value = data;
      });
  
      const uniqueGenres = computed(() => {
        const genres = stories.value.map((story) => story.genre);
        return [...new Set(genres)];
      });
  
      const filteredStories = computed(() => {
        return stories.value.filter((story) => {
         const matchesGenre = !filters.value.genre || story.genre === filters.value.genre;
          const matchesTitle = !filters.value.title || story.title.toLowerCase().includes(filters.value.title.toLowerCase());
          return matchesGenre && matchesTitle;
        });
      });
  
      return {
        stories,
        selectedStory,
        filters,
        filteredStories,
        uniqueGenres,
      };
    },
  });
  </script>
  
  <style>
  .main-container {
    background-color: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .filters-container {
    background-color: #e9ecef;
    padding: 15px;
    border-radius: 8px;
  }
  
  .catalog-container {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .popup-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1050;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Contenitore principale */
  .main-container {
    background-color: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
  }
  
  /* Contenitore filtri */
  .filters-container {
    background-color: #e9ecef;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
  
  .filters-row {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .filter-item {
    flex: 1 1 30%; /* Ogni filtro prende il 30% dello spazio disponibile */
    min-width: 200px; /* Larghezza minima */
  }
  
  /* Contenitore catalogo */
  .catalog-container {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Griglia flessibile */
    gap: 15px; /* Spaziatura tra le card */
  }
  
  /* Popup */
  .popup-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1050;
    background-color: rgba(0, 0, 0, 0.5);
    width: 90%;
    max-width: 600px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
  }
  
  .popup-container .popup-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  /* Card */
  .catalog-container .card {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .catalog-container .card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .catalog-container .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  </style>
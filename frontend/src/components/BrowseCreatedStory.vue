<!--Componente di browse delle storie create con possibilità di modifica e 
accesso a componente di creazione storia 
TODO sarebbe stories non story-->

<template>
    <div class="main-container">
      <button class="close-btn" @click="closeComponent">✖</button>

      <!-- Mostro il catalogo solo se non stiamo modificando -->
      <div v-if="currentView === 'catalog'">
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
              <!--<BrowseCreatedStoryCard
              v-for="story in filteredStories" 
              :key="story.id" 
              :story="story" 
            />-->
            <BrowseCreatedStoryCard
              v-for="story in filteredStories" 
              :key="story.id" 
              :story="story"
              @edit-details="editStory"
              @edit-content="editContent"
            />

            <!-- Card vuota per creare una nuova storia -->
            <div class="card create-story-card" @click="createNewStory">
              <div class="card-body text-center">
                <h5 class="card-title">Crea una nuova storia</h5>
                <button class="btn btn-success">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mostra il componente di modifica solo se `currentView` è impostato su su "editStory". 
       Se lo è allora CreateStory viene montato nel DOM.
       Quando CreateStory emette l'evento @close, la vista torna al catalogo (currentView = 'catalog' -->
      <CreateStory 
        v-if="currentView === 'editStory'" 
        :existingStory="selectedStory" 
        @updateStories="fetchStories" 
        
        @close="() => { fetchStories(); currentView = 'catalog'; }"
      />

      <BrowseCreatedStoryScenarios 
        v-if="currentView === 'editContent'" 
        :storyTitle="selectedStory?.title" 
        @close="currentView = 'catalog'" 
      />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, computed } from 'vue';
  import { StoryRepository } from '../repositories/StoryRepository';
  import BrowseCreatedStoryCard from './BrowseCreatedStoryCard.vue';
  import CreateStory from './CreateStory.vue';
  import BrowseCreatedStoryScenarios from './BrowseCreatedStoryScenarios.vue';
  import { getAuth } from "firebase/auth";
  
  export default defineComponent({
    name: 'BrowseCreatedStory',
    components: {
      BrowseCreatedStoryCard,
      CreateStory, 
      BrowseCreatedStoryScenarios
    },
    setup() {
      const stories = ref([]);
      const filters = ref({
        genre: '',
        title: '',
      });
      const selectedStory = ref(null);
      const currentView = ref('catalog'); // Stato della visualizzazione

      const auth = getAuth();
      const currentUser = auth.currentUser;
  
      // Fetch stories from repository
      //TODO gestione utente corrente, si può unificare da qualche parte?
      StoryRepository.getStoriesByAuthor(currentUser.uid).then((data) => {
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

      //  Funzioni per cambiare vista
      const editStory = (story) => {
        selectedStory.value = story;
        currentView.value = 'editStory';
      };

      const editContent = (story) => {
        selectedStory.value = story;
        currentView.value = 'editContent';
      };

      const createNewStory = () => {
        selectedStory.value = null;
        currentView.value = "editStory";
      };

      const closeComponent = () => {
        window.unmountVueComponentsInExtention("BrowseCreatedStory");
      };

      const fetchStories = async () => {
        stories.value = await StoryRepository.getStoriesByAuthor(currentUser.uid);
      };
  
      return {
        stories,
        filters,
        filteredStories,
        uniqueGenres,
        currentView,
        selectedStory,
        editStory,
        editContent,
        createNewStory,
        closeComponent,
        fetchStories
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

  /**Card vuota */
  .create-story-card {
  border: 2px dashed #28a745;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.create-story-card:hover {
  background-color: #e9ecef;
}

  
  </style>
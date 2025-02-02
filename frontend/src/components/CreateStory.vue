<template>
  <!--TODO
  - salvataggio immagine, come?
  -->
  <div class="container mt-5">
    <h1>{{ existingStory ? "Modifica la storia" : "Crea una nuova storia" }}</h1>

    <!-- Dettagli della storia -->
    <div v-if="!storySaved">
        <h3>Dettagli della storia</h3>
        <form @submit.prevent="saveStory">
          <div class="mb-3">
            <label for="storyTitle" class="form-label">Titolo</label>
            <input
              type="text"
              id="storyTitle"
              class="form-control"
              v-model="story.title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="storyDescription" class="form-label">Descrizione</label>
            <textarea
              id="storyDescription"
              class="form-control"
              rows="3"
              v-model="story.description"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="storyImage" class="form-label">Carica Immagine</label>
            <input 
              type="file" 
              id="storyImage" 
              class="form-control" 
              @change="handleImageUpload" />
          </div>
          <div class="mb-3">
            <label for="storyGenre" class="form-label">Genere</label>
            <input
              type="text"
              id="storyGenre"
              class="form-control"
              v-model="story.genre"
              placeholder="Es. Avventura, Fantascienza"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            {{ existingStory ? "Salva Modifiche" : "Salva Dettagli della Storia" }}
          </button>
          
        </form>
    </div>
     <!-- Componente CreateScenario -->
     <CreateScenario
        v-if="storySaved && !existingStory"
        :storyTitle="story.title"
        :storyId="storyId"
        @finish="resetStory"
    />
  
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Story } from "../models/Story";
import { StoryRepository } from "../repositories/StoryRepository";
import { getAuth } from "firebase/auth";
import { AisuruService } from "@/services/AisuruService";
import CreateScenario from "./CreateScenario.vue";
import ImageRepository from "@/repositories/ImageRepository";

export default defineComponent({
  name: "CreateStory",
  props: {
    existingStory: {
      type: Object as PropType<Story | null>,
      default: null,
    },
  },
  components: { CreateScenario },
  emits: ["storySaved"],
  /*
  data() {
    return {
      story:  this.existingStory
      ? { ...this.existingStory }
      : {
        title: "",
        description: "",
        image: "",
        author: "",
        genre: "",
      } as Story,
      storySaved: false,
      //storyId: "",  Memorizza l'ID della storia
      storyId: this.existingStory?.id || "",
      selectedImage: null as File | null,
      aisuruService: new AisuruService(), // Inizializza il servizio Aisuru
    };
  },*/
  data() {
    return {
      story: {} as Story,
      storySaved: false,
      storyId: "",
      selectedImage: null as File | null,
      aisuruService: new AisuruService(),
    };
  },
  created() {
    this.initializeStory();
  },
  watch: {
    existingStory: {
      handler() {
        this.initializeStory();
      },
      deep: true,
      immediate: true, // Inizializza subito se existingStory è già disponibile
    },
  },
methods: {
  initializeStory() {
      this.story = this.existingStory
        ? { ...this.existingStory }
        : {
            id: "",
            title: "",
            description: "",
            image: "",
            author: "",
            genre: "",
          };
    },
    handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        this.selectedImage = target.files[0];
      }
    },
    async saveStory() {
      try {
        // Id utente corrente TODO guarda se c'è già metodo nel repository
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("Utente non autenticato");
        }

        // autore utente corrente
        this.story.author = currentUser.uid;

          // Controllo stato sessione
          try {
          this.aisuruService.checkEnsureSession();
        } catch (error) {
          console.error("Errore nel verificare/creare una sessione da giver:", error);
        }

        //necessario?
        if (this.selectedImage) {
          this.story.image = await ImageRepository.uploadImage(this.selectedImage);
        } else if (this.existingStory) {
          this.story.image = this.existingStory.image; // Mantiene l'immagine attuale se non modificata
        }

        if (this.storyId) {
          // Se esiste già un ID, significa che stiamo aggiornando una storia
          await StoryRepository.updateStory(this.storyId, this.story);
          alert("Storia aggiornata con successo!");
        } else {
        // Salvataggio storia
        const newStoryId = await StoryRepository.saveStory(this.story);
          this.story.id = newStoryId;
          alert(`Storia salvata con successo! ID: ${newStoryId}`);
          this.storySaved = true;
        }

      } catch (error) {
        console.error("Errore durante il salvataggio della storia:", error);
        alert("Errore durante il salvataggio. Riprova.");
      }
    },
    // Reset stato componente
    resetStory() {
      this.storySaved = false;
      //this.initializeStory();  che dovrebbe sostituire quello sotto
      this.storyId = "";
      this.story = {
        id: "",
        title: "",
        description: "",
        image: "",
        author: "",
        genre: "",
      };
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>

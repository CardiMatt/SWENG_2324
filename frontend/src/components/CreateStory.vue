<!-- Componente di creazione e modifica Storia. 
  Inserimento e modifica dettagli. 
  Se si sta creando una nuova storia, passaggio alla creazione di Scenari -->
<template>
  <div class="container mt-5">
    <button class="btn btn-secondary" @click="$emit('close')">← Torna Indietro</button>
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
              :readonly="!!existingStory"
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
        :storyId="story.id"
        @insertionFinished="handleFinish"
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
  emits: ["close", "updateStories"],

  data() {
    return {
      story: {} as Story,
      storySaved: false,
      storyId: "",
      selectedImage: null as File | null,
      aisuruService: new AisuruService(),
    };
  },
  /** Popolo i dati della storia se la storia esiste già. */
  created() {
    this.initializeStory();
  },
  /** watch assicura che il form sia sempre sincronizzato intercettando le modifiche anche dopo il montaggio. */
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
      if (this.existingStory) {
        console.log("id esistente: ",this.existingStory.id)
        this.story = { ...this.existingStory };
        this.storyId = this.existingStory.id; // Ci assicuriamo di avere l'id della storia.
      } else {
        this.story = {
          id: "",
          title: "",
          description: "",
          image: "",
          author: "",
          genre: "",
        };
        this.storyId = "";
      }
    },

    handleImageUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        this.selectedImage = target.files[0];
      }
    },

    async saveStory() {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("Utente non autenticato");
        }

        /** autore = utente corrente **/
        this.story.author = currentUser.uid;

        /** Controllo stato sessione **/
        try {
          this.aisuruService.checkEnsureSession();
        } catch (error) {
          console.error("Errore nel verificare/creare una sessione da giver:", error);
        }

        /** Gestione immagine: se viene caricata la carica, altrimenti mantiene l'immagine attuale **/
        if (this.selectedImage) {
          this.story.image = await ImageRepository.uploadImage(this.selectedImage);
        } else if (this.existingStory) {
          this.story.image = this.existingStory.image; 
        }

        /** Se esiste già un ID, significa che stiamo aggiornando una storia.
         * Altrimenti ne stiamo creando una nuova. **/
        if (this.storyId) {
          await StoryRepository.updateStory(this.storyId, this.story);
          alert("Storia aggiornata con successo!");
          this.handleFinish();
        } else {
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
    /** Reset stato componente **/
    handleFinish() {
      this.storySaved = false;
      this.storyId = "";
      this.story = {
        id: "",
        title: "",
        description: "",
        image: "",
        author: "",
        genre: "",
      };
      this.$emit("updateStories"); 
      this.$emit("close");
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>

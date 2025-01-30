<template>
  <!--TODO
  - salvataggio immagine, come?
  -->
  <div class="container mt-5">
    <h1>Crea una nuova storia</h1>

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
            <label for="storyImage" class="form-label">URL Immagine</label>
            <input
              type="text"
              id="storyImage"
              class="form-control"
              v-model="story.image"
              placeholder="Inserisci il link a un'immagine"
            />
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
            Salva Dettagli della Storia
          </button>
        </form>
      <!--</div>-->
    </div>
     <!-- Componente CreateScenario -->
     <CreateScenario
        v-else
        :storyTitle="story.title"
        :storyId="storyId"
        @finish="resetStory"
    />
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Story } from "../models/Story";
import { StoryRepository } from "../repositories/StoryRepository";
import { getAuth } from "firebase/auth";
import { AisuruService } from "@/services/AisuruService";
import CreateScenario from "./CreateScenario.vue";

export default defineComponent({
  name: "CreateStory",
  components: { CreateScenario },
  emits: ["storySaved"],
  data() {
    return {
      story: {
        title: "",
        description: "",
        image: "",
        author: "",
        genre: "",
      } as Story,
      storySaved: false,
      storyId: "", // Memorizza l'ID della storia
      aisuruService: new AisuruService(), // Inizializza il servizio Aisuru
    };
  },
  methods: {
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


        // Salvataggio storia
        const storyId = await StoryRepository.saveStory(this.story);
        console.log("Storia salvata con ID:", storyId);
        alert(`Storia salvata con successo! ID: ${storyId}`);

        this.storySaved = true;
        this.storyId = storyId; 

      } catch (error) {
        console.error("Errore durante il salvataggio della storia:", error);
        alert("Errore durante il salvataggio. Riprova.");
      }
    },
    // Reset stato componente
    resetStory() {
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
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>

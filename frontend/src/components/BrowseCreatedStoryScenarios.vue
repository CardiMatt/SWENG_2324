<template>
  <!--TODO
  - La modifica non viene visualizzata subito, serve tornare indietro e riaprire
  - Indaga su perchè ogni volta apre una nuova sessione.. è uno spreco
  --quellla roba del caricamento probabilmente inutile
  -->
    <div class="container mt-4">
      <button class="btn btn-secondary" @click="$emit('close')">← Torna Indietro</button>
      <h2>Memorie della Storia: {{ storyTitle }}</h2>

      <div v-if="loading" class="text-center my-3">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Caricamento...</span>
        </div>
      </div>

      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-else>
        <div class="accordion" id="memoriesAccordion">
          <div class="accordion-item" v-for="(memory, index) in memories" :key="memory.memoryID">
            <h2 class="accordion-header" :id="'heading' + index">
              <button 
                class="accordion-button" 
                type="button" 
                data-bs-toggle="collapse" 
                :data-bs-target="'#collapse' + index" 
                aria-expanded="true" 
                :aria-controls="'collapse' + index">
                {{ memory.title }}
              </button>
            </h2>
            <div 
              :id="'collapse' + index" 
              class="accordion-collapse collapse" 
              :aria-labelledby="'heading' + index" 
              data-bs-parent="#memoriesAccordion">
              <div class="accordion-body">
                <h5>Risposte:</h5>
                <ul class="list-group">
                  <li v-for="(answer, aIndex) in memory.answers" :key="aIndex" class="list-group-item">
                    <div v-if="editingMemoryId === memory.memoryID && editingAnswerIndex === aIndex">
                      <textarea
                        v-model="editedAnswer"
                        class="form-control mb-2"
                        rows="3"
                      ></textarea>
                      <button class="btn btn-success btn-sm me-2" @click="saveEdit(memory.memoryID)">
                        Salva
                      </button>
                      <button class="btn btn-secondary btn-sm" @click="cancelEdit">
                        Annulla
                      </button>
                    </div>
                    <div v-else>
                      {{ answer }}
                      <button class="btn btn-warning btn-sm ms-2" @click="editAnswer(memory.memoryID, aIndex, answer)">
                        Modifica
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <!--TODO decidere se usare solo script senza setup come negli altri o questo lasciarlo cosi
  cambiano 2 robine tipo:
  rileva automaticamente gli eventi emessi con $emit(), quindi non serve dichiarare manualmente emit
  -->
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { AisuruService } from "@/services/AisuruService";
  
  const props = defineProps<{ storyTitle: string }>();
  const memories = ref<{ memoryID: string; title: string; answers: string[] }[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const aisuruService = new AisuruService();

  // Stato per l'editing
  const editingMemoryId = ref<string | null>(null);
  const editingAnswerIndex = ref<number | null>(null);
  const editedAnswer = ref<string>("");

  const fetchMemories = async () => {
    loading.value = true;
    error.value = null;

    try {
        memories.value = await aisuruService.filteredPaginatedMemories(props.storyTitle);
        console.log(memories);
    } catch (err) {
        error.value = 'Errore nel caricamento delle memorie';
        console.error(err);
    } finally {
        loading.value = false;
    }
  };

  // Attiva la modalità modifica
  const editAnswer = (memoryID: string, index: number, answer: string) => {
    editingMemoryId.value = memoryID;
    editingAnswerIndex.value = index;
    editedAnswer.value = answer;
  };

  // Annulla modifica
  const cancelEdit = () => {
    editingMemoryId.value = null;
    editingAnswerIndex.value = null;
    editedAnswer.value = "";
  };



  // Salva la modifica e chiama UpdateScenario
  const saveEdit = async (memoryID: string) => {

    if (!editingMemoryId.value) {
    console.error("Errore: memoryID è null");
    return;
    }

    const memory = {
      memoryType: 'Question' as 'Question',
      memoryID: editingMemoryId.value,
      answers: [
        {
          text: editedAnswer.value,
          lastChangeTimestamp: new Date().toISOString()
        },
      ],
    };

    console.log("Salvando modifica:", memoryID, editedAnswer.value);

    try{
      await aisuruService.updateMemory(memory);
    console.log("Memoria aggiornata");
    cancelEdit();
    } catch (error) {
      console.error("Errore durante l'aggiornamento della memoria:", error);
    }
  };


  onMounted(fetchMemories);
/**onMounted è un hook di Vue 3 che esegue una funzione quando il componente è montato nel DOM.
In questo caso, chiama fetchMemories() non appena il componente viene visualizzat */


  </script>
  
  <style>
  .accordion-button {
    font-weight: bold;
  }

  textarea {
  resize: vertical;
}
  </style>
  
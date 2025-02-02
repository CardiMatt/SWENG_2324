<template>
    <div class="container mt-4">
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
                    {{ answer }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { AisuruService } from "@/services/AisuruService";
  import type { Memory } from '@memori.ai/memori-api-client/dist/types';
  import type { MemoryResponse } from "@/models/MemoryResponse";
  
  const props = defineProps<{ storyTitle: string }>();
  const memories = ref<{ memoryID: string; title: string; answers: string[] }[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);
      const aisuruService = new AisuruService();

    const fetchMemories = async () => {
        loading.value = true;
  error.value = null;


    try {
        memories.value = await aisuruService.filteredMemories(props.storyTitle);
        console.log(memories);
    } catch (err) {
        error.value = 'Errore nel caricamento delle memorie';
        console.error(err);
    } finally {
        loading.value = false;
    }
    };

    onMounted(fetchMemories);
/**onMounted è un hook di Vue 3 che esegue una funzione quando il componente è montato nel DOM.
In questo caso, chiama fetchMemories() non appena il componente viene visualizzat */




  //const memories = ref<Memory[]>([]);
//   const loading = ref(true); //ma cos'è non lo voglio
//   const error = ref<string | null>(null);
// const aisuruService = new AisuruService();
// const memories = ref<{ title: string; answers: { text: string }[] }[]>([]); // Solo title e answers

  
//   const fetchMemories = async () => {
//     try {
  //  const response = await aisuruService.filterMemories(props.sessionID, props.storyTitle);
     // memories.value = await aisuruService.filterMemories(props.sessionID, props.storyTitle);
    // memories.value = response.matches.map((match: any) => match.memory as Memory);  // Estrai solo la parte 'memory' che ti interessa
     
    // Ottieni la risposta del tipo MemoryResponse
    //  const response: MemoryResponse = await aisuruService.filterMemories(props.sessionID, props.storyTitle);
    
    // Mappatura della risposta per ottenere solo i campi necessari (title e answers)
//     memories.value = response.matches.map(match => ({
//       title: match.memory.title ?? 'Titolo non disponibile', // Default se il titolo è undefined
//       answers: match.memory.answers ?? [] // Default vuoto se answers è undefined
//     }));

//     } catch (err) {
//       error.value = 'Errore nel caricamento delle memorie';
//     } finally {
//       loading.value = false;
//     }  
//   };
  
//   onMounted(fetchMemories);

  /**
   * {
  "count": 3,
  "matches": [
    {
      "memory": {
        "memoryID": "1412c5be-9baf-4bae-88a0-ff54f08fb03e",
        "memoryType": "Question",
        "lastRead": "2025-01-31T16:33:44.983247Z",
        "readOccurrences": 2,
        "media": [],
        "title": "00001",
        "titleVariants": [],
        "answers": [
          {
            "text": "In un piccolo villaggio, un giovane avventuriero di nome Piero trova una mappa misteriosa in un vecchio libro che apparteneva a suo nonno. La mappa mostra un percorso verso un artefatto leggendario chiamato \"Cuore di Luce\", che si dice abbia il potere di cambiare il destino di chi lo trova.\nPiero, deciso a scoprire la verità, si avvia verso la foresta dove la mappa sembra condurre. Dopo qualche ora di cammino, si trova davanti a un bivio:\nDa un lato vede una strada più chiara e diretta che sembra portare verso un antichissimo altare, dall’altro invece scorge un sentiero meno battuto, ma indicato come una zona misteriosa sulla mappa.",
            "preformatted": false,
            "creationTimestamp": "2025-01-31T16:07:30.880435Z",
            "creationSessionID": "9fee7c4a-131b-446b-84c9-d456e83dd1bc",
            "lastChangeTimestamp": "2025-01-31T16:07:30.880435Z",
            "lastChangeSessionID": "9fee7c4a-131b-446b-84c9-d456e83dd1bc"
          }
        ],
        "conclusive": true,
        "notPickable": true,
        "help": false,
        "hints": [
          "Prendi il sentiero diretto verso l'altare",
          "Esplora il sentiero misterioso per cercare qualcosa di più intrigante"
        ],
        "minTimeout": 20,
        "maxTimeout": 40,
        "contextVarsToSet": {
          "STORIA": "CUOREDILUCE",
          "SCENARIO": "0"
        },
        "contextVarsToMatch": {
          "AUTH": "AUTENTICATO"
        },
        "tags": [
          "CuoreDiLuce"
        ],
        "creationTimestamp": "2025-01-31T12:36:02.6331Z",
        "creationSessionID": "faa4eb6a-61eb-407a-a211-92d734204243",
        "lastChangeTimestamp": "2025-01-31T16:33:44.983248Z",
        "lastChangeSessionID": "b5da4c3c-1426-429d-af84-9a0bcbfea723"
      },
      "confidence": 0.699999988079071,
      "confidenceLevel": "LOW"
    },
    {
      "memory": {
        "memoryID": "9961012d-a58a-4972-85e1-65d4501944f0",
        "memoryType": "Question",
        "lastRead": "2025-01-31T16:33:46.978743Z",
        "readOccurrences": 1,
        "media": [],
        "title": "Prendi il sentiero diretto verso l'altare",
        "titleVariants": [],
        "answers": [
          {
            "text": "Piero sceglie il sentiero diretto. Arriva all'altare antico, dove un’iscrizione recita:\n \"Colui che cerca la verità dovrà affrontare l'ignoto.\"\n In cima all'altare, ci sono due possibili strade:\nUna strada oscura, avvolta da una nebbia fitta, che sembra nascondere un segreto oscuro e una via più tranquilla che porta verso una radura illuminata dalla luce della luna. \nQuale delle due strade vuoi seguire?",
            "preformatted": false,
            "creationTimestamp": "2025-02-01T19:01:21.474517Z",
            "creationSessionID": "9c8e5c9f-d567-4377-bfe4-27f55c08ae5b",
            "lastChangeTimestamp": "2025-02-01T19:01:21.474517Z",
            "lastChangeSessionID": "9c8e5c9f-d567-4377-bfe4-27f55c08ae5b"
          }
        ],
        "conclusive": false,
        "notPickable": false,
        "help": false,
        "hints": [],
        "minTimeout": 20,
        "maxTimeout": 40,
        "contextVarsToSet": {
          "SCENARIO": "1"
        },
        "contextVarsToMatch": {
          "AUTH": "AUTENTICATO",
          "STORIA": "CUOREDILUCE"
        },
        "tags": [
          "CuoreDiLuce"
        ],
        "creationTimestamp": "2025-01-31T12:36:03.076282Z",
        "creationSessionID": "faa4eb6a-61eb-407a-a211-92d734204243",
        "lastChangeTimestamp": "2025-02-01T19:01:21.474567Z",
        "lastChangeSessionID": "9c8e5c9f-d567-4377-bfe4-27f55c08ae5b"
      },
      "confidence": 0.699999988079071,
      "confidenceLevel": "LOW"
    },
    {
      "memory": {
        "memoryID": "8f7df2fa-dec7-48a3-9938-72a683c7af49",
        "memoryType": "Question",
        "media": [],
        "title": "Esplora il sentiero misterioso per cercare qualcosa di più intrigante",
        "titleVariants": [],
        "answers": [
          {
            "text": "Piero decide di esplorare il sentiero misterioso. Dopo poco, arriva a un lago nascosto. Al suo centro, un bagliore attira la sua attenzione.\nVuoi immergerti nel lago o preferisci continuare il sentiero?",
            "preformatted": false,
            "creationTimestamp": "2025-02-01T19:01:40.958739Z",
            "creationSessionID": "9c8e5c9f-d567-4377-bfe4-27f55c08ae5b",
            "lastChangeTimestamp": "2025-02-01T19:01:40.958739Z",
            "lastChangeSessionID": "9c8e5c9f-d567-4377-bfe4-27f55c08ae5b"
          }
        ],
        "conclusive": false,
        "notPickable": false,
        "help": false,
        "hints": [],
        "minTimeout": 20,
        "maxTimeout": 40,
        "contextVarsToSet": {
          "SCENARIO": "2"
        },
        "contextVarsToMatch": {
          "AUTH": "AUTENTICATO",
          "STORIA": "CUOREDILUCE"
        },
        "tags": [
          "CuoreDiLuce"
        ],
        "creationTimestamp": "2025-01-31T12:36:03.408195Z",
        "creationSessionID": "faa4eb6a-61eb-407a-a211-92d734204243",
        "lastChangeTimestamp": "2025-02-01T19:01:40.958795Z",
        "lastChangeSessionID": "9c8e5c9f-d567-4377-bfe4-27f55c08ae5b"
      },
      "confidence": 0.699999988079071,
      "confidenceLevel": "LOW"
    }
  ],
  "requestID": 2250654,
  "requestDateTime": "2025-02-01T19:03:41.2999064Z",
  "resultCode": 0,
  "resultMessage": "Ok"
}
   */
  </script>
  
  <style>
  .accordion-button {
    font-weight: bold;
  }
  </style>
  
<template>
  <!--


    ESEMPIO
    {
  "memoryID": "string",
  "memoryType": "string",
  "title": "string",
  "answers": [
    {
      "text": "string",
      "preformatted": true,
      "creationTimestamp": "2025-01-29T10:48:34.753Z",
      "creationSessionID": "string",
      "lastChangeTimestamp": "2025-01-29T10:48:34.753Z",
      "lastChangeSessionID": "string"
    }
  ],
  "date": "2025-01-29T10:48:34.753Z",
  "placeName": "string",
  "conclusive": true,
  "notPickable": true,
  "help": false,
  "hints": [
    "string"
  ],
  "contextVarsToSet": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "contextVarsToMatch": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "tags": [
    "string"
  ]
}


Prova compilata
{
  "memoryID": "5788e361-9bfa-4a03-a094-1d10c52a449d",
  "memoryType": "Question",
  "title": "Titolo",
  "answers": [
    {
      "text": "risppstaa",
      "preformatted": true,
    }
  ],
  "date": "2025-01-29T10:48:34.753Z",
  "conclusive": true,
  "notPickable": true,
  "help": false,
  "hints": [
    "primoHint"
  ],
  "contextVarsToSet": {
    "additionalProp1": "prpvaprop1toset",
    "additionalProp2": "provaprop2toset",
    "additionalProp3": "provaprop3toset"
  },
  "contextVarsToMatch": {
    "additionalProp1": "prova1tomatch",
    "additionalProp2": "prova2tomach",
    "additionalProp3": "prova3tomatch"
  },
  "tags": [
    "titoloStoriaTag"
  ]
}
-->
  <div class="container mt-5">
    <h2>Crea uno Scenario</h2>
    <form @submit.prevent="saveScenario">
      <!-- Titolo -->
      <div class="mb-3">
        <label for="title" class="form-label">Titolo</label>
        <div>
          <select id="title" class="form-select" v-model="scenario.title" required>
            <option disabled value="">Seleziona un hint come titolo</option>
            <option v-for="hint in availableHints" :key="hint" :value="hint">
              {{ hint }}
            </option>
          </select>
        </div>
      </div>

      <!-- Answers -->
      <div class="mb-3">
        <label for="answer" class="form-label">Risposta</label>
        <textarea type="text" id="answer" class="form-control" v-model="scenario.answer.text"
          placeholder="Inserisci una risposta" required ></textarea>
      </div>

      <!-- Scenario Finale -->
      <div class="mb-3 form-check">
        <input type="checkbox" id="finalScenario" class="form-check-input" v-model="scenario.isFinal" />
        <label for="finalScenario" class="form-check-label">
          È uno scenario finale
        </label>
      </div>

      <!-- Hints -->
      <div class="mb-3">
        <label for="hints" class="form-label">Hints</label>
        <div class="input-group">
          <input type="text" id="hints" class="form-control" v-model="newHint" placeholder="Inserisci un hint" />
          <button class="btn btn-primary" type="button" @click="addHint">Aggiungi Hint</button>
        </div>
        <ul class="list-group mt-2">
          <li v-for="(hint, index) in scenario.hints" :key="index"
            class="list-group-item d-flex justify-content-between align-items-center">
            {{ hint }}
            <button class="btn btn-sm btn-danger" @click="removeHint(index)">
              Rimuovi
            </button>
          </li>
        </ul>
      </div>


      <!-- Context Vars to Set -->
      <div class="mb-3">
        <label for="contextVarsToSet" class="form-label">
          Context Vars to Set (JSON)
        </label>
        <textarea id="contextVarsToSet" class="form-control" v-model="scenario.contextVarsToSet" rows="3"
          placeholder='{"additionalProp1": "prop1ToSet","additionalProp2": "prop2ToSet"}'>
        </textarea>
      </div>

      <!-- Context Vars to Match -->
      <div class="mb-3">
        <label for="contextVarsToMatch" class="form-label">
          Context Vars to Match (JSON)
        </label>
        <textarea id="contextVarsToMatch" class="form-control" v-model="scenario.contextVarsToMatch" rows="3"
          placeholder='{"additionalProp1": "prop1ToMatch","additionalProp2": "prop2ToMatch"}'></textarea>
      </div>

      <!-- Pulsanti -->
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">
          Salva Scenario e Continua
        </button>
        <button type="button" class="btn btn-secondary" @click="finishInsertion">
          Termina Inserimento
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AisuruService } from "@/services/AisuruService";

export default defineComponent({
  props: {
    storyTitle: {
      type: String,
      required: true,
    },
    storyId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      aisuruService: new AisuruService(),
      availableHints: [this.storyId], // Inizialmente solo lo storyId (convenzione: primo scenario con titolo come l'id della storia)
      scenario: {
        title: this.storyId, // Titolo predefinito per il primo scenario
        answer: {
          text: "",
          preformatted: true,
        },
        memoryType: "Question",
        conclusive: true,
        notPickable: true,
        help: false,
        hints: [] as string[],
        contextVarsToSet: "",
        contextVarsToMatch: "",
        isFinal: false,
      },
      newHint: "", // Input temporaneo per un nuovo hint
    };
  },
  methods: {
    addHint() {
      if (this.newHint.trim() && !this.scenario.hints.includes(this.newHint)) {
        this.scenario.hints.push(this.newHint.trim());
        this.availableHints.push(this.newHint.trim()); // Aggiungi l'hint alla lista disponibile
        this.newHint = ""; // Resetta l'input
      }
    },

    removeHint(index: number) {
      this.scenario.hints.splice(index, 1);
    },

    async saveScenario() {
      if (!this.scenario.title) {
        alert("Inserisci un titolo per lo scenario!");
        return;
      }

      let contextVarsToSet: { [key: string]: string } = {};
      let contextVarsToMatch: { [key: string]: string } = { "AUTH": "AUTENTICATO" }; //Sempre presente AUTH

      try {

         //Se il titolo è lo storyId, imposta STORIA: IDSTORIA di default
         //Dal 2° scenario in poi, STORIA va nelle contextVarsToMatch
        if (this.scenario.title === this.storyId) {
          contextVarsToSet = { "STORIA": this.storyId };
        } else {
          contextVarsToMatch = { ...contextVarsToMatch, "STORIA": this.storyId };
        }

        // Se lo scenario è finale, aggiunge "FINALE" alle contextVarsToSet
        if (this.scenario.isFinal) {
          contextVarsToSet["FINALE"] = "true"; // "true" è simbolico, può essere vuoto ""
        }

        /**TODO qui si potrebbe mettere un pattern per evitare tutti questi if else? boh */

         // Popola contextVarsToSet
        if (this.scenario.contextVarsToSet.trim()) {
          const parsed = JSON.parse(this.scenario.contextVarsToSet);
          if (typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error("contextVarsToSet deve essere un oggetto JSON.");
          }
          contextVarsToSet = { ...contextVarsToSet, ...parsed }; //Merge con eventuali altri valori
    
        }

         // Popola contextVarsToMatch
        if (this.scenario.contextVarsToMatch.trim()) {
          const parsed = JSON.parse(this.scenario.contextVarsToMatch);
          if (typeof parsed !== 'object' || Array.isArray(parsed)) {
            throw new Error("contextVarsToMatch deve essere un oggetto JSON.");
          }
          contextVarsToMatch = {  ...contextVarsToMatch, ...parsed  }; // Merge completo
        }

        if (contextVarsToSet !== null) {
          this.scenario.contextVarsToSet = JSON.stringify(contextVarsToSet, null, 2);
        }

        if (contextVarsToMatch !== null) {
          this.scenario.contextVarsToMatch = JSON.stringify(contextVarsToMatch, null, 2);
        }
      } catch (error) {
        alert(`Errore nel campo Context Vars to Set`);
        return;
      }
 
      const memory = {
        memoryType: 'Question' as 'Question',
        title: this.scenario.title,
        answers: [
          {
            text: this.scenario.answer.text,
            preformatted: this.scenario.answer.preformatted,
          },
        ],
        date: new Date().toISOString(),
        conclusive: this.scenario.conclusive,
        notPickable: this.scenario.notPickable,
        help: this.scenario.help,
        hints: this.scenario.hints,
        ...(contextVarsToSet !== null && { contextVarsToSet }),
        contextVarsToMatch, //Assicurato sempre presente con AUTH: AUTENTICATO
        tags: [this.storyTitle],
      };


      const memoryID = await this.aisuruService.addMemory(memory);
      console.log("Memoria salvata con ID:", memoryID);

      this.prepareNextScenario();
    },

    prepareNextScenario() {
      const currentTitle = this.scenario.title;
      this.availableHints = this.availableHints.filter((hint) => hint !== currentTitle);

      this.scenario = {
        title: this.availableHints[0] || "", // Il primo hint disponibile diventa il titolo
        answer: {
          text: "",
          preformatted: true,
        },
        memoryType: "Question",
        conclusive: true,
        notPickable: true,
        help: false,
        hints: [],
        contextVarsToSet: "",
        contextVarsToMatch: "",
        isFinal: false,
      };
    },

    finishInsertion() {
      alert("Inserimento scenari completato!");
      this.$emit("insertionFinished");
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>

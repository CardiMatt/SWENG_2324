<template>
<!--
  TODO - Da risolvere
    1)l'invio negli hint causa il salvataggio diretto
    2) fa un fake salvataggio, dice che salva ma non ritorna l'id
-->
  <div class="container mt-5">
    <h2>Crea uno Scenario</h2>
    <form @submit.prevent="saveScenario">
      <!-- Titolo -->
      <div class="mb-3">
        <label for="title" class="form-label">Titolo</label>
        <p>isFirstScenario: {{ isFirstScenario }}</p>
        <div v-if="!isFirstScenario">
          <select
            id="title"
            class="form-select"
            v-model="scenario.title"
            required
          >
            <option disabled value="">Seleziona un hint come titolo</option>
            <option v-for="hint in availableHints" :key="hint" :value="hint">
              {{ hint }}
            </option>
          </select>
        </div>
        <input
          v-else
          type="text"
          id="title"
          class="form-control"
          v-model="scenario.title"
          :readonly="isFirstScenario"
          placeholder="isFirstScenario"
        />
      </div>

      <!-- Answers -->
      <div class="mb-3">
        <label for="answer" class="form-label">Risposta</label>
        <input
          type="text"
          id="answer"
          class="form-control"
          v-model="scenario.answer.text"
          placeholder="Inserisci una risposta"
          required
        />
      </div>

      <!-- Scenario Finale -->
      <div class="mb-3 form-check">
        <input
          type="checkbox"
          id="finalScenario"
          class="form-check-input"
          v-model="scenario.isFinal"
        />
        <label for="finalScenario" class="form-check-label">
          È uno scenario finale
        </label>
      </div>

      <!-- Hints -->
      <div class="mb-3">
        <label for="hints" class="form-label">Hints</label>
        <input
          type="text"
          id="hints"
          class="form-control"
          v-model="newHint"
          placeholder="Inserisci un hint e premi Invio"
          @keyup.enter="addHint"
        />
        <ul class="list-group mt-2">
          <li
            v-for="(hint, index) in scenario.hints"
            :key="index"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ hint }}
            <button
              class="btn btn-sm btn-danger"
              @click="removeHint(index)"
            >
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
        <textarea
          id="contextVarsToSet"
          class="form-control"
          v-model="scenario.contextVarsToSet"
          rows="3"
          placeholder='{"key1": "value1", "key2": "value2"}'
        ></textarea>
      </div>

      <!-- Context Vars to Match -->
      <div class="mb-3">
        <label for="contextVarsToMatch" class="form-label">
          Context Vars to Match (JSON)
        </label>
        <textarea
          id="contextVarsToMatch"
          class="form-control"
          v-model="scenario.contextVarsToMatch"
          rows="3"
          placeholder='{"key1": "value1", "key2": "value2"}'
        ></textarea>
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
    isFirstScenario: {
      type: Boolean,
      default: false,
    },
    storyTitle: {
      type: String,
      required: true,
    },
    initialHints: {
      type: Array as () => string[],
      default: () => ["00001"],
    },
  },
  data() {
    return {
      aisuruService: new AisuruService(),
      scenario: {
        title: this.isFirstScenario ? "00001" : "",
        answer: {
          text: "",
          preformatted: true, // Valore fisso
        },
        memoryType: "Question", // Valore fisso
        conclusive: true, // Valore fisso
        notPickable: true, // Valore fisso
        help: true, // Valore fisso
        hints: [] as string[],
        contextVarsToSet: "",
        contextVarsToMatch: "",
        isFinal: false, // Controllo per "Scenario Finale"
      },
      newHint: "", // Hint temporaneo
      availableHints: this.initialHints, // Lista degli hints disponibili
    };
  },
  methods: {
    addHint() {
      if (this.newHint.trim() && !this.scenario.hints.includes(this.newHint)) {
        this.scenario.hints.push(this.newHint.trim());
        this.newHint = "";
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

      // Contesto FINAL se checkbox true
      try {
        // Parse existing contextVarsToSet (if valid JSON) or initialize as an array
        let contextVarsToSet = [];
        if (this.scenario.contextVarsToSet.trim()) {
          contextVarsToSet = JSON.parse(this.scenario.contextVarsToSet);
          if (!Array.isArray(contextVarsToSet)) {
            throw new Error("contextVarsToSet deve essere un array JSON.");
          }
        }

        // Add "FINAL" if the scenario is marked as final
        if (this.scenario.isFinal && !contextVarsToSet.includes("FINAL")) {
          contextVarsToSet.push("FINAL");
        }

        // Update the scenario contextVarsToSet as a stringified JSON
        this.scenario.contextVarsToSet = JSON.stringify(contextVarsToSet, null, 2);
      } catch (error) {
        alert(`Errore nel campo Context Vars to Set`);
        return;
      }

      //**TODO Richiamare salvataggio scenario */
      // Crea l'oggetto memoria da salvare
      const memory = {
          title: this.scenario.title,
          answers: [{
            text: this.scenario.answer.text,       // Campo obbligatorio
            preformatted:this.scenario.answer.preformatted     // Campo obbligatorio (valore fisso)
          }],
          memoryType: 'Question' as 'Question',
          conclusive: this.scenario.conclusive,
          notPickable: this.scenario.notPickable,
          help: this.scenario.help,
          hints: this.scenario.hints,
          contextVarsToSet: JSON.parse(this.scenario.contextVarsToSet || "[]"),
          contextVarsToMatch: JSON.parse(this.scenario.contextVarsToMatch || "[]"),
        };

        // Salva la memoria utilizzando il servizio
        const memoryID = await this.aisuruService.addMemory(memory);
        console.log("Memoria salvata con ID:", memoryID);

      // Rimuovi il titolo dagli hints disponibili
      this.availableHints = this.availableHints.filter(
        (hint) => hint !== this.scenario.title
      );

      
      console.log("Scenario salvato:", this.scenario);

      // Reset del form
      this.resetForm();
    },
    resetForm() {
      this.scenario = {
        title: "",
        answer: {
          text: "",
          preformatted: true,
        },
        memoryType: "Question",
        conclusive: true,
        notPickable: true,
        help: true,
        hints: [],
        contextVarsToSet: "",
        contextVarsToMatch: "",
        isFinal: false,
      };
    },
    finishInsertion() {
      alert("Inserimento scenari completato!");
      // Logica per uscire dal flusso o navigare altrove
      this.$emit("finish");
    },
  },
});
</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>

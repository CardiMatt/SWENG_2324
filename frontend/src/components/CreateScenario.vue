<!-- Componente di creazione scenari (contesti Aisuru (memory))-->
<template>
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

      <!-- Bottoni -->
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
      availableHints: [this.storyTitle], // Inizialmente solo lo storyTitle (convenzione: primo scenario con titolo come il titolo della storia)
      scenario: createScenario(this.storyId),
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
      let contextVarsToMatch: { [key: string]: string } = {}; 

      try {
         /** Se il titolo è lo storyTitle, imposta STORIA: IDSTORIA di default
         Dal 2° scenario in poi, STORIA va nelle contextVarsToMatch **/
        if (this.scenario.title === this.storyTitle) {
          contextVarsToSet = { "STORIA": this.storyId };
        } else {
          contextVarsToMatch = { ...contextVarsToMatch, "STORIA": this.storyId, "AUTH": "AUTENTICATO" };
        }

        /** Se lo scenario è finale, aggiunge "FINALE" alle contextVarsToSet **/
        if (this.scenario.isFinal) {
          contextVarsToSet["FINALE"] = "true"; // "true" è simbolico, può essere vuoto ""
        }

        try {
          contextVarsToSet = { ...contextVarsToSet, ...parseContextVars(this.scenario.contextVarsToSet) };
          contextVarsToMatch = { ...contextVarsToMatch, ...parseContextVars(this.scenario.contextVarsToMatch) };
        
          if (contextVarsToSet !== null) {
            this.scenario.contextVarsToSet = JSON.stringify(contextVarsToSet, null, 2);
          }

          if (contextVarsToMatch !== null) {
            this.scenario.contextVarsToMatch = JSON.stringify(contextVarsToMatch, null, 2);
          }
        } catch (error) {
          alert('Errore nel settaggio delle Context Vars');
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
          ...(contextVarsToMatch !== null && { contextVarsToMatch }),
          tags: [this.storyTitle],
        };

        const memoryID = await this.aisuruService.addMemory(memory);
        console.log("Memoria salvata con ID:", memoryID);

      } catch (error) {
          alert(`Errore nel salvataggio della Memoria`);
          return;
      }

      this.prepareNextScenario();
    },

    prepareNextScenario() {
      this.availableHints = this.availableHints.filter(hint => hint !== this.scenario.title);
      this.scenario = createScenario(this.availableHints[0] || "");
    },

    finishInsertion() {
      alert("Inserimento scenari completato!");
      this.$emit("insertionFinished");
    },
  },
});

/** Factory function che centralizza la creazione di nuovi scenari**/
function createScenario(title: string = "") {
  return {
    title,
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
  };
}

/** Function che centralizza il parsing e la validazione dei JSON**/
function parseContextVars(input: string): Record<string, string> {
  if (!input.trim()) return {}; // Se vuoto, restituisce un oggetto vuoto
  try {
    const parsed = JSON.parse(input);
    if (typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Il JSON deve essere un oggetto.");
    }
    return parsed;
  } catch {
    throw new Error("Formato JSON non valido.");
  }
}

</script>

<style scoped>
.container {
  max-width: 700px;
}
</style>

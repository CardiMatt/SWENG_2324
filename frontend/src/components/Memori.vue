<template>
  <!-- Memori client con i parametri fissi, tranne context e initialQuestion -->
  <memori-client
    memoriName="Adventures Master"
    ownerUserName="matteocardinale2002"
    memoriID="fa22537f-6cd4-45f9-b21e-347747222db6"
    ownerUserID="fcfa7ae4-aedc-4a52-a137-4d2a858d6561"
    tenantID="www.aisuru.com"
    engineURL="https://engine.memori.ai"
    apiURL="https://backend.memori.ai"
    baseURL="https://www.aisuru.com"
    uiLang="IT"
    spokenLang="IT"
    layout="ZOOMED_FULL_BODY"
    showInstruct="false"
    showSettings="true"
    showClear="false"
    showAIicon="true"
    showWhyThisAnswer="true"
    showTypingText="false"
    showOnlyLastMessages="true"
    showTranslationOriginal="false"
    showCopyButton="false"
    showShare="true"
    showLogin="false"
    useMathFormatting="false"
    showUpload="false"
    autoStart="true"
    enableAudio="true"
    integrationID="5f2ab2ab-5574-4ec6-9034-fd5fb948a449"
    
    :context="finalMemoriConfig.context"
    :initialQuestion="finalMemoriConfig.initialQuestion"
  >
  </memori-client>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MemoriConfig, GameSave } from '@/models/GameSave';

/**
 * Props:
 * - memoriConfig:  un oggetto con { context, initialQuestion }
 * - gameSaveData:  un oggetto completo di tipo GameSave,
 *                  che contiene al suo interno memoriConfig
 *
 * Se vengono passati entrambi, diamo priorità a gameSaveData (ad es. se vuoi forzare il salvataggio caricato).
 */
const props = defineProps<{
  memoriConfig?: MemoriConfig;  // props memoriConfig diretta
  gameSaveData?: GameSave;      // props con gameSave completo
}>();

/**
 * In caso non riceviamo nulla dalle props,
 * definiamo un fallback defaultMemoriConfig.
 */
const defaultMemoriConfig: MemoriConfig = {
  context: 'AUTH:NON_AUTENTICATO,STORIA:NULL',
  initialQuestion: 'Benvenuto',
};

/**
 * finalMemoriConfig:
 * - Se esiste gameSaveData e in particolare la memoriConfig dentro di esso, utilizziamo quella.
 * - Altrimenti, se esiste memoriConfig passata come prop, usiamo quella.
 * - Altrimenti usiamo la configurazione di default.
 */
const finalMemoriConfig = computed<MemoriConfig>(() => {
  if (props.gameSaveData && props.gameSaveData.memoriConfig) {
    return props.gameSaveData.memoriConfig;
  } else if (props.memoriConfig) {
    return props.memoriConfig;
  }
  return defaultMemoriConfig;
});
/*
const saveCurrentState = async () => {
  try {
    // Costruisci il tuo oggetto GameSave con i dati minimi + memoriConfig
    const gameSaveData = {
      userId: 'myTestUser',
      storyId: 'someStory',
      state: 'active',
      progress: '50',
      inventory: 'sword',
      saveDate: new Date(),
      memoriConfig: memoriConfig.value
    };

    // Salva su Firestore
    const newSaveId = await GameSaveRepository.saveGameSave(gameSaveData);
    console.log('Salvataggio completato con ID:', newSaveId);
  } catch (error) {
    console.error('Errore durante il salvataggio:', error);
  }
};

*/
</script>





<!-- 

 /*#chat-fieldset {*/
    /*display: none;  Nasconde completamente l'elemento */
    /*pointer-events: none;  Disabilita l'interazione con il puntatore */
    /* user-select: none; Impedisce la selezione del contenuto */
    /*}*/


/**
 * Dispatches a MemoriTextEntered event to simulate a user typing a message
 * @param message The text message to send
 * @param waitForPrevious Whether to wait for previous message to finish before sending (default true)
 * @param hidden Whether to hide the message from chat history (default false)
 * @param typingText Optional custom typing indicator text
 * @param useLoaderTextAsMsg Whether to use the loader text as the message (default false)
 * @param hasBatchQueued Whether there are more messages queued to be sent (default false)
 */
const typeMessage = (
  message: string,
  waitForPrevious = true,
  hidden = false,
  typingText?: string,
  useLoaderTextAsMsg = false,
  hasBatchQueued = false
) => {

---

const typeBatchMessages = (
  messages: {
    message: string;
    waitForPrevious?: boolean;
    hidden?: boolean;
    typingText?: string;
    useLoaderTextAsMsg?: boolean;
  }[]
) 
-->
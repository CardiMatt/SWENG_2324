<!-- frontend/src/components/Memori.vue -->
<template>
  <div>
    <!--<memori-client
      :key="refreshKey"
      memoriName="AdventuresMaster"
      ownerUserName="guedz_"
      memoriID="d826f951-3c06-41a7-93ca-568c6c9290b4"
      ownerUserID="775e2e09-1937-428b-bf95-95ed2010ab3b"
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
      integrationID="b949a370-6383-4a8e-9a13-621980e38503"
      :context="finalMemoriConfig.context"
      :initialQuestion="finalMemoriConfig.initialQuestion"
    />-->

    <memori-client
      :key="refreshKey"
      memoriName="Chatbot Test"
      ownerUserName="exmita"
      memoriID="7edc38c8-e8ca-4778-b9eb-72ac6967ac7e"
      ownerUserID="3194fcd3-040b-4d5e-a925-691911fb1177"
      tenantID="exmachina.aclambda.online"
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
      integrationID="2bdfef47-d1d0-410b-b433-8b7819699199"
      :context="finalMemoriConfig.context"
      :initialQuestion="finalMemoriConfig.initialQuestion"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { MemoriConfig, GameSave } from '@/models/GameSave';
import { onMounted, onUnmounted } from 'vue';
import eventBus from '@/eventBus';

// Props
const props = defineProps<{
  memoriConfig?: MemoriConfig;
  gameSaveData?: GameSave;
}>();

onMounted(() => {
  eventBus.on('updateMemoriConfig', (newConfig: MemoriConfig) => {
    refreshMemori(newConfig);
  });
});

onUnmounted(() => {
  eventBus.off('updateMemoriConfig');
});

// Fallback default configuration
const defaultMemoriConfig: MemoriConfig = {
  context: 'AUTH:NON_AUTENTICATO,STORIA:NULL',
  initialQuestion: 'Benvenuto',
};

// Reactive key for forcing a refresh
const refreshKey = ref(0);

// Final configuration based on props
const finalMemoriConfig = computed<MemoriConfig>(() => {
  if (props.gameSaveData && props.gameSaveData.memoriConfig) {
    return props.gameSaveData.memoriConfig;
  } else if (props.memoriConfig) {
    return props.memoriConfig;
  }
  return defaultMemoriConfig;
});

/**
 * Expose a method to refresh the MemoriClient with a new config
 * @param newConfig New MemoriConfig object
 */
function refreshMemori(newConfig: MemoriConfig) {
  // Aggiorna la configurazione direttamente dalle props
  if (props.memoriConfig) {
    Object.assign(props.memoriConfig, newConfig);
  }
  // Incrementa la chiave di refresh per forzare il ri-render
  refreshKey.value += 1;
}

// Esponi il metodo per i componenti genitori
defineExpose({
  refreshMemori,
});
</script>

<style>
    .memori--global-background {
    pointer-events: none; /* Disabilita l'interazione con il background */
    }
    #chat-fieldset {
    display: none;  /*Nasconde completamente l'elemento */
    pointer-events: none;  /*Disabilita l'interazione con il puntatore */
    user-select: none; /*Impedisce la selezione del contenuto */
    }   
</style>
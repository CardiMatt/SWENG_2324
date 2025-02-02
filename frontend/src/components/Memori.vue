<!-- frontend/src/components/Memori.vue -->
<template>
  <div>
    <!--
    <memori-client
      :key="refreshKey"
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
    />
  -->
  <memori-client
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
      integrationID="5f2ab2ab-5574-4ec6-9034-fd5fb948a449"
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

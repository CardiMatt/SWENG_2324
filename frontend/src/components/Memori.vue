<template>
    <!-- Web Component di Memori -->
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
      context="AUTH:NON_AUTENTICATO,STORIA:NULL"
      integrationID="5f2ab2ab-5574-4ec6-9034-fd5fb948a449"
      initialQuestion="Benvenuto"
    ></memori-client>
</template>
<style>
    .memori--global-background {
    pointer-events: none; /* Disabilita l'interazione con il background */
    }

    
    /*#chat-fieldset {*/
    /*display: none;  Nasconde completamente l'elemento */
    /*pointer-events: none;  Disabilita l'interazione con il puntatore */
    /* user-select: none; Impedisce la selezione del contenuto */
    /*}*/
</style>

<script setup lang="ts">
</script>

<!-- 
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
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
        layout="TOTEM"
        showInstruct="false"
        showSettings="true"
        showClear="false"
        showAIicon="true"
        showWhyThisAnswer="true"
        showTypingText="false"
        showOnlyLastMessages="false"
        showTranslationOriginal="false"
        showCopyButton="false"
        showShare="true"
        showLogin="false"
        useMathFormatting="false"
        showUpload="false"
        enableAudio="true"
        integrationID="5f2ab2ab-5574-4ec6-9034-fd5fb948a449"
        initialQuestion="Benvenuto"
    ></memori-client>
</template>
<style>
    .memori--global-background {
    pointer-events: none; /* Disabilita l'interazione con il background */
    }

    #chat-fieldset {
    display: none; /* Nasconde completamente l'elemento */
    pointer-events: none; /* Disabilita l'interazione con il puntatore */
    user-select: none; /* Impedisce la selezione del contenuto */
    }
</style>

<script setup lang="ts">
</script>
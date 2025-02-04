# **Manuale Utente - Adventure Master**

## **1. Introduzione**

### **Cos'è Adventure Master**
Adventure Master è un gioco interattivo basato sulla narrazione, che permette agli utenti di vivere avventure personalizzate attraverso un sistema dinamico di scelte. Il cuore dell'applicazione è il suo agente conversazionale, Aisuru, che guida l'utente attraverso storie interattive e personalizzabili.

L'esperienza di gioco si sviluppa tramite un'interfaccia che combina una chat, in cui si interagisce con l'intelligenza artificiale, e un'estensione che mostra elementi grafici e interattivi. L'utente può scegliere tra giocare storie esistenti, creare nuove avventure o riprendere partite salvate.

Adventure Master è pensato per chi ama le storie interattive, il role-playing e la creazione di contenuti narrativi. Grazie al sistema di montaggio dinamico dei componenti, l'app offre un'interfaccia flessibile e immersiva, permettendo di esplorare trame avvincenti e di prendere decisioni che influenzano lo sviluppo della storia.

## **2. Interfaccia Principale**

### **Struttura generale dell'applicazione**
L'interfaccia di Adventure Master è suddivisa in due sezioni principali che lavorano in sinergia per offrire un'esperienza di gioco fluida e coinvolgente:
- **La Chat**: area in cui l'utente interagisce con l'agente conversazionale Aisuru. Qui vengono presentate le narrazioni, le opzioni di scelta e i suggerimenti dinamici basati sulle azioni dell'utente.
- **L'Extension**: un'area grafica separata dove vengono mostrati i componenti visivi interattivi. Questa sezione è utilizzata per rappresentare elementi della storia come mappe, immagini di ambientazioni e interfacce di gestione delle scelte e dei salvataggi.

### **Aree principali: Chat e Extension**
La **Chat** è il cuore dell'interazione narrativa. Qui l'utente riceve descrizioni delle scene, dialoghi e opzioni interattive che permettono di modellare l'evoluzione della storia. Ogni scelta può portare a diverse conseguenze e percorsi narrativi unici.

L'**Extension**, invece, fornisce il supporto visivo e funzionale all'esperienza di gioco. Qui vengono montati dinamicamente i componenti Vue, come l'elenco delle storie disponibili, i dettagli dei salvataggi e le schermate di creazione delle storie personalizzate.

### **Navigazione e interazioni principali**
L'utente può navigare tra le diverse funzionalità dell'applicazione attraverso l'agente Aisuru, che guida le interazioni. I principali punti di navigazione sono:
- **Login e Registrazione**: all'avvio dell'app, l'utente può autenticarsi per accedere ai propri progressi.
- **Selezione della storia**: un'interfaccia visuale permette di scegliere tra le storie disponibili o crearne di nuove.
- **Interazione con la narrazione**: durante il gioco, l'utente effettua scelte tramite i bottoni interattivi della chat.
- **Gestione dei salvataggi**: possibilità di salvare i progressi e caricare partite precedenti dall'Extension.

L'interfaccia di Adventure Master è progettata per essere intuitiva e offrire un'esperienza immersiva, combinando l'interazione testuale con elementi grafici dinamici.

## **3. Accesso all'Applicazione**

### **Login e autenticazione (`Login.vue`)**
Per accedere all'applicazione e recuperare i propri progressi, l'utente deve effettuare il login. L'accesso avviene tramite l'interfaccia della chat, in cui viene montato dinamicamente il componente `Login.vue`. Qui l'utente può inserire le proprie credenziali (email e password) e autenticarsi tramite il servizio Firebase.

Se le credenziali sono corrette, il sistema consente l'accesso e permette di proseguire con la navigazione nell'app. In caso di errore, vengono mostrati messaggi di avviso con indicazioni sulle possibili cause, come password errata o utente non registrato.

### **Registrazione di un nuovo utente (`Register.vue`)**
Se l'utente non possiede un account, può registrarsi tramite il componente `Register.vue`, anch'esso montato dinamicamente nella chat. Il processo di registrazione richiede l'inserimento di:
- Nome utente
- Indirizzo email
- Password

Una volta completati i campi, l'utente può confermare la registrazione. Il sistema verifica la validità delle informazioni e crea un nuovo account nel database Firebase. Se l'operazione ha successo, l'utente viene automaticamente autenticato e può iniziare a giocare.

In caso di problemi, vengono fornite indicazioni specifiche, come l'uso di una password non conforme o un'email già registrata.

## **4. Giocare una Storia**

### **Selezione di una storia (`Catalog.vue`, `CatalogCard.vue`)**
Dopo aver effettuato l'accesso, l'utente può scegliere una storia da giocare. L'elenco delle storie disponibili viene visualizzato nell'Extension tramite il componente `Catalog.vue`, con ogni storia rappresentata da una scheda (`CatalogCard.vue`). Selezionando una storia, l'utente può visualizzare una breve descrizione e avviare l'esperienza interattiva.

### **Interfaccia di gioco e narrazione**
Una volta avviata la storia, il gioco si sviluppa all'interno della Chat, con la narrazione che si adatta alle scelte effettuate dall'utente. Il testo della storia viene mostrato progressivamente, e l'utente può interagire con l'intelligenza artificiale Aisuru per prendere decisioni che influenzano l'andamento della trama.

### **Scelte e conseguenze**
Ogni decisione presa dall'utente può avere effetti immediati o a lungo termine sulla narrazione. Alcune scelte possono portare a percorsi alternativi della storia, mentre altre influenzano relazioni tra personaggi o eventi futuri.

### **Salvataggio dei progressi (`SaveGame.vue`)**
Durante il gioco, l'utente ha la possibilità di salvare i progressi tramite il componente `SaveGame.vue`, che consente di creare un punto di ripristino della partita. Questo permette di riprendere l’avventura in un secondo momento senza perdere i progressi effettuati.

### **Tornare al menu principale**
In qualsiasi momento, l'utente può interrompere la partita e tornare al menu principale per selezionare un'altra storia o accedere ad altre funzionalità dell'applicazione.


## **5. Caricare una Partita Salvata**

### **Navigazione tra i salvataggi (`BrowseSaves.vue`)**
L'utente può accedere ai salvataggi dalla sezione `Extension`, dove viene montato il componente `BrowseSaves.vue`. Qui viene mostrato un elenco delle partite precedentemente salvate, con dettagli su ciascuna sessione di gioco.

### **Selezione di un salvataggio**
Ogni salvataggio è rappresentato da una scheda contenente informazioni come il titolo della storia, la data dell'ultimo progresso salvato e un'anteprima dello stato attuale della partita. L'utente può selezionare il salvataggio desiderato per riprendere l'avventura da quel punto specifico.

### **Riprendere il gioco**
Dopo aver selezionato un salvataggio, il sistema carica lo stato della storia e posiziona l'utente esattamente nel punto in cui aveva interrotto la sessione precedente. L'interfaccia della chat riprende il dialogo con Aisuru, consentendo di proseguire senza perdere progressi.

### **Eliminazione di un salvataggio**
L'utente ha anche la possibilità di eliminare un salvataggio direttamente dall'elenco. Accanto al pulsante di caricamento della partita, è presente un'opzione per rimuovere il file di salvataggio. Una finestra di conferma verrà mostrata per evitare eliminazioni accidentali, garantendo all'utente il controllo sulla gestione dei propri progressi.


## **6. Creare una Storia Personalizzata**

### **Creazione di una nuova storia (`CreateStory.vue`)**
L'utente può creare una storia personalizzata attraverso il componente `CreateStory.vue`, che fornisce un'interfaccia intuitiva per l'inserimento del titolo, della descrizione e delle impostazioni principali della storia. Una volta definiti questi elementi, l'utente può passare alla creazione degli scenari.

### **Aggiunta di scenari (`CreateScenario.vue`)**
Ogni storia è composta da diversi scenari che ne determinano l'evoluzione. Attraverso `CreateScenario.vue`, l'utente può definire le singole scene, inserendo descrizioni testuali, immagini illustrative e le opzioni di scelta disponibili per il giocatore.

### **Modifica e gestione delle storie (`BrowseCreatedStory.vue`, `BrowseCreatedStoryScenarios.vue`)**
Dopo aver creato una storia e i relativi scenari, l'utente può modificarli e gestirli attraverso `BrowseCreatedStory.vue` e `BrowseCreatedStoryScenarios.vue`. Questi componenti permettono di visualizzare l'elenco delle storie create, accedere ai dettagli di ciascuna scena e modificarne i contenuti o le opzioni di scelta.

### **Salvataggio e pubblicazione**
Una volta completata la storia, l'utente può salvarla e, se lo desidera, pubblicarla affinché altri giocatori possano accedervi. Il sistema consente di mantenere una bozza privata o di condividere la storia con la community di Adventure Master, permettendo ad altri di esplorare e giocare le creazioni personalizzate.


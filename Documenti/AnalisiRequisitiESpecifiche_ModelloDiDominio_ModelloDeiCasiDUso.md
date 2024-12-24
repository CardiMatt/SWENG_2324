# Descrizione del Progetto: Applicazione Web per Storie Interattive

## Panoramica

Il progetto consiste nella realizzazione di un'applicazione web che permette agli utenti di **scrivere** e **giocare** a storie interattive. Le storie interattive sono narrazioni in cui il giocatore può prendere decisioni che influenzano lo sviluppo della trama, conducendo a diverse diramazioni e finali.

## Struttura del Gruppo

- **Dimensione del Gruppo:** 3 persone
- **Informazioni e Requisiti Specifici:**
  - **Obbligatorio per gruppi da 3:**
    - Implementazione delle funzionalità di scrittura e gioco delle storie senza la necessità di gestire pagamenti.
  - **Opzionale per gruppi da 3:**
    - Implementazione di funzionalità avanzate che normalmente sarebbero obbligatorie per gruppi da 4.

## Requisiti Funzionali

### 1. Scrittura delle Storie

- **Creazione di Nuove Storie:**
  - Permettere agli utenti di creare storie con:
    - Un **inizio**.
    - **Diramazioni** multiple basate sulle scelte del giocatore.
    - Uno o più **finali**.
  - Ogni scenario deve offrire:
    - **2 o più alternative** per procedere.
    - **Risoluzione di indovinelli** (testuali o numerici) per progredire.
    - Possibilità di **raccogliere oggetti** che vengono aggiunti all'inventario del protagonista.
    - **Accesso a diramazioni** specifiche in base agli oggetti presenti nell'inventario.

- **Modifica delle Storie:**
  - Consentire la modifica del **testo** che descrive gli scenari.
  - **Impossibile modificare** la struttura delle diramazioni.

### 2. Giocare alle Storie

- **Selezione e Avvio:**
  - Permettere agli utenti di scegliere una storia dal catalogo e avviarla.
  - Visualizzare il **primo scenario** con le opzioni disponibili.

- **Interazione durante il Gioco:**
  - Consentire al giocatore di:
    - Prendere decisioni influenzate dagli **oggetti nell'inventario**.
    - Rispondere a **indovinelli** per proseguire.
    - **Raccogliere oggetti** durante il gioco.

- **Gestione del Gioco:**
  - Permettere di **interrompere** e **salvare** lo stato di una storia in corso.
  - Consentire di **eliminare** una partita in corso.
  - Supportare la **giocata simultanea** di più storie.

### 3. Gestione delle Storie Scritte

- **Modifica del Testo:**
  - Permettere agli utenti di modificare il testo descrittivo degli scenari.
  - Non consentire modifiche alle diramazioni esistenti.

### 4. Gestione delle Storie Giocate

- **Salvataggio e Interruzione:**
  - Consentire agli utenti di salvare lo stato corrente di una storia.
  - Permettere di interrompere e riprendere la giocata in un secondo momento.
  - Fornire la possibilità di eliminare una storia in corso.

### 5. Ricerca e Visualizzazione delle Storie

- **Catalogo delle Storie:**
  - Permettere ai visitatori di **ricercare** storie applicando filtri come:
    - **Username dello scrittore**.
    - **Lunghezza della storia**.
  - Consentire la **visualizzazione del primo scenario** senza possibilità di interazione.

### 6. Registrazione e Autenticazione

- **Registrazione degli Utenti:**
  - Permettere ai visitatori di registrarsi.
  - **Proprietà Utente:**
    - **Username**
    - **Password**

- **Autenticazione:**
  - Gestire **login** e **logout** degli utenti.

### 7. Persistenza dei Dati

- **Salvataggio Dati:**
  - Salvare i dati degli utenti e delle storie.
  - Garantire il recupero dei dati anche dopo lo spegnimento e il riavvio del sistema.

## Requisiti Non Funzionali

- **Usabilità:**
  - Interfaccia intuitiva e accessibile agli utenti inesperti.
  
- **Performance:**
  - Risposta rapida alle interazioni degli utenti.
  
- **Sicurezza:**
  - Protezione dei dati degli utenti.
  - Gestione sicura delle credenziali di accesso.

## Casi d'Uso

### Casi d'Uso Principali

1. **Registrazione di un Utente**
   - **Attori:** Visitatori
   - **Descrizione:** Un visitatore si registra fornendo un username e una password.

2. **Login e Logout**
   - **Attori:** Utenti Registrati
   - **Descrizione:** Gli utenti registrati possono accedere e uscire dal sistema.

3. **Creazione di una Nuova Storia**
   - **Attori:** Utenti Registrati
   - **Descrizione:** Un utente crea una nuova storia definendo scenari e diramazioni.

4. **Modifica di una Storia Esistente**
   - **Attori:** Utenti Registrati
   - **Descrizione:** Un utente modifica il testo di uno scenario di una storia.

5. **Giocare a una Storia**
   - **Attori:** Utenti Registrati
   - **Descrizione:** Un utente seleziona una storia e prende decisioni per progredire.

6. **Salvataggio e Interruzione di una Giocata**
   - **Attori:** Utenti Registrati
   - **Descrizione:** Un utente salva lo stato di una storia in corso e può riprenderla in seguito.

7. **Riprendere una Partita Salvata**
   - **Attori:** Utenti Registrati
   - **Descrizione:** Un utente riprende una partita precedentemente salvata.

8. **Eliminazione di una Giocata In Corso**
   - **Attori:** Utenti Registrati
   - **Descrizione:** Un utente elimina una partita in corso.

9. **Ricerca e Visualizzazione di Storie**
   - **Attori:** Visitatori e Utenti Registrati
   - **Descrizione:** Gli utenti possono cercare e visualizzare le storie disponibili.

### Casi d'Uso Opzionali per Gruppi da 4

1. **Pagamento per Giocare alle Storie**
   - **Attori:** Utenti Registrati
   - **Descrizione:** Durante la registrazione o successivamente, un utente effettua un pagamento una tantum per poter giocare alle storie.
   - **Dettagli:**
     - Integrazione con un servizio esterno di pagamento.
     - Gestione del successo o del fallimento del pagamento.
     - Possibilità di riprovare in caso di fallimento.

## Requisiti per Gruppi da 4 (Opzionali per Gruppi da 3)

- **Integrazione dei Pagamenti:**
  - Implementare un sistema di pagamento per consentire agli utenti di giocare alle storie.
  - Gestire transazioni sicure e feedback sull'esito del pagamento.

## Domain Model

Il modello di dominio rappresenta i concetti principali e le loro relazioni all'interno dell'applicazione. Di seguito è riportata una descrizione testuale delle classi e delle loro interazioni:

- **Catalogo**
  - **Descrizione:** Contiene tutte le storie disponibili nell'applicazione.
  - **Relazioni:**
    - **1..*** contiene **Storia**

- **Storia**
  - **Descrizione:** Rappresenta una singola storia interattiva scritta da un utente.
  - **Relazioni:**
    - **1..*** composta da **Scenario**
    - **1** scritta da **Utente**

- **Scenario**
  - **Descrizione:** Rappresenta una singola scena all'interno di una storia, descrivendo una situazione specifica e le possibili azioni.
  - **Relazioni:**
    - **0..1** può includere **Indovinello**
    - **0..*** contiene/raccoglie **Oggetto**
    - **1..*** transizioni/diramazioni a **Scenario**

- **Indovinello**
  - **Descrizione:** Un enigma testuale o numerico che il giocatore deve risolvere per proseguire nella storia.
  
- **Utente**
  - **Descrizione:** Rappresenta un individuo che utilizza l'applicazione, sia come scrittore che come giocatore.
  - **Relazioni:**
    - **0..*** gioca **Giocata**
    - **1..*** scrive **Storia**

- **Oggetto**
  - **Descrizione:** Un elemento che può essere raccolto dal giocatore durante la storia e utilizzato per accedere a determinate diramazioni.
  
- **Giocata**
  - **Descrizione:** Rappresenta una sessione di gioco di un utente su una specifica storia.
  - **Relazioni:**
    - **1** riferita a **Storia**
    - **1** possiede **Inventario**

- **Inventario**
  - **Descrizione:** Contiene gli oggetti raccolti dal giocatore durante una giocata.
  - **Relazioni:**
    - **0..*** contiene **Oggetto**

## Specifiche Tecniche

- **Linguaggi e Framework:** A scelta del gruppo, con uno stack tecnologico consigliato come Java, Maven, GWT, MapDB, Gson, JUnit.
- **Versionamento:** Utilizzo di Git e GitHub per il controllo delle versioni e la gestione del progetto.
- **Persistenza Dati:** Implementazione di una soluzione di database per salvare storie e dati utente.
- **Testing:** Implementazione di test di unità, possibilmente adottando l'approccio TDD.

## Considerazioni Finali

Questo progetto richiede una collaborazione efficace tra i membri del gruppo per gestire sia le funzionalità di scrittura che di gioco delle storie. La scelta di strumenti e tecnologie adeguate, insieme a una buona pianificazione del processo di sviluppo, sarà fondamentale per il successo del progetto.

> **Nota:** Le funzionalità opzionali per gruppi da 4 sono indicate chiaramente e non devono essere implementate da gruppi da 3, a meno che non si scelga di farlo per aggiungere valore al progetto.

# Tecnologie

La seguente lista specifica quali sono le tecnologie che è obbligatorio utilizzare per svolgere il progetto.

- **[Git](https://git-scm.com/)** → per il versionamento dei file
- **[GitHub](https://github.com/)** → come repository remoto, issue tracking system, project management board
- **[GitHub Actions](https://github.com/features/actions)** → *Opzionale per i gruppi da 3, obbligatorio per quelli da 4*
  - CI/CD pipeline. Alcune idee per cosa utilizzarla sono:
    - Automazione dell’esecuzione dei test di unità
    - Controllo di formattazione e regole decise del gruppo riguardo al codice sorgente
    - Creazione automatica di un eseguibile

> **Nota:** Strumenti alternativi possono essere adottati previa richiesta e autorizzazione in quanto quelli specificati vengono usati per la consegna e la valutazione.

Il gruppo può scegliere quali linguaggi, framework e librerie utilizzare per la realizzazione del progetto.

## Stack Tecnologico Consigliato

Uno possibile stack tecnologico, e per il quale sarà fornita assistenza specifica, è il seguente:

- **Java**
- **[Maven](https://maven.apache.org/)** → per la gestione delle dipendenze e del processo di build del progetto
- **[GWT](https://www.gwtproject.org/)** → per la realizzazione delle pagine web
- **[MapDB](https://mapdb.org/)** → persistenza dei dati
- **[Gson](https://github.com/google/gson)** → interazione con JSON
- **[JUnit](https://junit.org/junit5/)** → per la realizzazione di unit testing

Nell’appendice ci sono alcuni esempi che si possono seguire utilizzando questo stack tecnologico.

# Modello di processo

Il modello di processo suggerito è un **ibrido strutturato-agile** composto da due fasi:

## Fasi del Processo

### 1. Inception
In questa fase vengono prodotti almeno i seguenti artefatti:
- Modellazione dei casi d’uso
- Modello di dominio
- Glossario

### 2. Construction
In questa fase si eseguono le pratiche di gestione di processo di **Scrum**. I componenti del gruppo si immedesimano a turno nei seguenti ruoli:

- **Development Team** `[2]`
- **Scrum Master** `[1 se il gruppo è da 4, 1 che farà anche parte del development team se il gruppo è da 3]`
- **Product Owner** `[1]`

I ruoli si cambiano al termine di ogni sprint.

## Eventi del Framework Scrum

Devono essere rispettati i seguenti eventi:

- Sprint Planning
- Daily Scrum
- Sprint Review
- Sprint Retrospective

## Artefatti Standard

E prodotti i seguenti artefatti standard:

- Product Backlog
- Sprint Backlog
- Burn Down Chart

Durante la fase di **construction**, il team di sviluppo dovrà adottare il **workflow feature branch** facendo uso delle **pull request** di GitHub.

# Product Backlog e Sprint Backlog

Per la gestione del lavoro da svolgere si useranno le **board** messe a disposizione da GitHub (**Projects**).

### Passaggi:

1. Creare un nuovo project e collegarlo al repository.
2. La board sarà successivamente popolata da quelli che GitHub chiama “item”.

### Dettagli:

- **Product Backlog** (colonna Product Backlog della board) sarà popolato dagli **Use Cases** individuati durante la fase di inception. Questi non devono essere trasformati in issue vere e proprie.
- Durante lo **Sprint Planning**, quando si decide di lavorare a uno Use Case, questo viene raffinato in task veri e propri (che corrispondono alla realizzazione delle funzionalità a supporto dei diversi scenari relativi al caso d’uso, i cosiddetti “use case slice”) e le varie issue devono essere create.

## Esempi di Stato della Board

### Stato Iniziale della Board

- **UC raffinati**
- **Product Backlog**
- **Sprint Backlog**
- …
- **UC-1**
- **UC-2**

### Stato della Board dopo lo Sprint Planning

- **UC raffinati**
- **Product Backlog**
- **Sprint Backlog**
- …
- **UC-1**
- **UC-2**
  - **Task 1 per UC-1**
  - **Task 2 per UC-1**

> **Nota:** La colonna “UC raffinati” serve solo per mantenere uno storico dei casi d’uso processati durante l’avanzamento del progetto.

# Prodotti da Realizzare

Dalle fasi di inception e construction si devono consegnare i seguenti artefatti:

- **Modello dei casi d’uso** (con la descrizione di ognuno di essi)
- **Modello di dominio**
- **Burn Down Chart**

### Documenti Richiesti

1. **Manuale Utente**
   - Deve contenere una guida accessibile ad un utente inesperto che spieghi come utilizzare il prodotto realizzato.

2. **Manuale dello Sviluppatore**
   - Deve contenere le istruzioni su come installare e lanciare su un nuovo computer il software sviluppato a partire dall’ottenimento del codice sorgente.
   - Deve contenere una panoramica che documenti come sono state realizzate le funzionalità richieste, in particolare se sono stati individuati e utilizzati dei design pattern, specificando quali vantaggi ha portato la loro adozione.

3. **Diario del Progetto**
   - Deve riportare in modo sintetico come il progetto è avanzato nel tempo e come il gruppo si è organizzato. In particolare deve essere riportato:
     - Inizio e fine delle iterazioni e degli sprint
     - Chi ha fatto quale ruolo durante lo sprint
     - Stato della board a inizio e fine sprint. Questo permette di capire la vostra pianificazione e il vostro riuscire a seguire quanto pianificato

# Testing dell’Applicazione

È richiesto che vengano implementati i **test di unità** per l’applicazione.

- Potete adottare l’approccio **TDD (Test Driven Development)**.

> **Nota:** Non è richiesto di implementare i test per il codice che si occupa della gestione dell’interfaccia grafica.

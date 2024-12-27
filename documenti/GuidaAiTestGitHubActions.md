
# Configurazione di GitHub Actions per Backend e Frontend

Questo documento descrive come il repository è configurato per eseguire automaticamente i test per il backend (Node.js) e il frontend (Vue.js) utilizzando GitHub Actions.

## Struttura del Repository
La struttura del repository è organizzata come segue:

```graphql
my-repo/
├── backend/ # Backend in Node.js
│ ├── package.json
│ ├── src/
│ ├── tests/
├── frontend/ # Frontend in Vue.js
│ ├── package.json
│ ├── src/
│ ├── tests/
└── .github/
└── workflows/
└── ci.yml # File di configurazione per GitHub Actions

```

## Workflow di GitHub Actions

Il file `ci.yml` nella directory `.github/workflows/` è configurato per:

- Eseguire i test per il backend nella directory `backend/`.

- Eseguire i test per il frontend nella directory `frontend/`.

- Eseguire i test in parallelo, migliorando i tempi di esecuzione.

## Contenuto del Workflow

Ecco il contenuto del file `ci.yml`:

```yaml
name: CI for Backend and Frontend
on:
push:
branches:
- main

pull_request:
branches:
- main

jobs:
backend-tests:
name: Backend Tests
runs-on: ubuntu-latest
steps:
- name: Checkout code

uses: actions/checkout@v3
- name: Setup Node.js

uses: actions/setup-node@v3
with:
node-version: '16'

- name: Install dependencies for backend
run: |
cd backend
npm install

- name: Run tests for backend
run: |
cd backend
npm test

frontend-tests:
name: Frontend Tests
runs-on: ubuntu-latest
steps:
- name: Checkout code
uses: actions/checkout@v3

- name: Setup Node.js
uses: actions/setup-node@v3
with:
node-version: '16'
- name: Install dependencies for frontend
run: |
cd frontend
npm install

- name: Run tests for frontend
run: |
cd frontend
npm test
```  

## Dettagli del Workflow

### Eventi Trigger:
Il workflow si attiva automaticamente in caso di:
- Push sul branch `main`.
- Apertura di una pull request sul branch `main`.

### Job Separati:
-  **backend-tests**: Esegue i test nella directory `backend/`.

-  **frontend-tests**: Esegue i test nella directory `frontend/`.

### Passaggi di Esecuzione:
1.  **Checkout del Codice**: Recupera il codice dal repository.

2.  **Setup Node.js**: Configura l'ambiente con Node.js versione 16.

3.  **Installazione delle Dipendenze**:

- Esegue `npm install` nella directory corrispondente.

4.  **Esecuzione dei Test**:

- Esegue `npm test` per eseguire i test definiti in ciascun progetto.

### Esecuzione Parallela:
I job `backend-tests` e `frontend-tests` vengono eseguiti simultaneamente, migliorando i tempi complessivi.

## Cosa Fare se un Test Fallisce
GitHub Actions interromperà il workflow e segnerà il job come fallito (❌).
Puoi vedere i dettagli del fallimento nella scheda **Actions** del repository su GitHub.
I test devono essere corretti prima che il codice possa essere unito nel branch `main`.

## Estensioni Possibili

### Build del Frontend:
Aggiungi un passaggio per eseguire il build del progetto Vue.js:
```yaml
- name: Build frontend
run: |
cd frontend
npm run build
```

### Test di Integrazione:
Se necessario, configura un job aggiuntivo per eseguire test di integrazione tra backend e frontend.

### Dipendenze tra Job:
Se il frontend dipende dal backend, puoi specificare una dipendenza:

```yaml
jobs:
frontend-tests:
needs: backend-tests
```

Questo workflow garantisce che sia il backend che il frontend siano testati automaticamente, assicurando un processo di sviluppo stabile e affidabile.
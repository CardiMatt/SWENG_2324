@startuml
' Impostiamo lo stile e forziamo la direzione left-to-right
skinparam actorStyle awesome
skinparam backgroundcolor #FFFFFF
skinparam usecase {
  BackgroundColor #F8F8F8
  BorderColor #999999
  ArrowColor #999999
  ActorBorderColor black
  ActorFontColor black
  FontColor black
}
left to right direction

' Definizione dell'attore generale "Utente" al centro
actor "Utente" as Utente

' Definizione degli attori specifici
actor "Visitatore" as V
actor "Utente Registrato" as U

' Posizionamento relativo degli attori specifici
V -right-|> Utente
U -left-|> Utente

rectangle "Use Cases" {
  usecase "UC-1:\nRegistrazione" as UC1
  usecase "UC-2:\nLogin" as UC2
  usecase "UC-3:\nLogout" as UC3
  usecase "UC-4:\nRicerca e Visual.\nStorie" as UC4
  usecase "UC-5:\nScrittura di una\nNuova Storia" as UC5
  usecase "UC-6:\nModifica del\nTesto della Storia" as UC6
  usecase "UC-7:\nGiocare una Storia" as UC7
  usecase "UC-8:\nInterrompere e\nSalvare la Partita" as UC8
  usecase "UC-9:\nRiprendere una\nPartita Salvata" as UC9
  usecase "UC-10:\nEliminare una\nPartita in Corso" as UC10
}

' Collegamenti Utente Generale
Utente --> UC4 : ""

' Collegamenti Visitatore
V --> UC1 : ""
V --> UC2 : ""

' Collegamenti Utente Registrato
U --> UC3 : ""
U --> UC5 : ""
U --> UC6 : ""
U --> UC7 : ""
U --> UC8 : ""
U --> UC9 : ""
U --> UC10: ""

@enduml
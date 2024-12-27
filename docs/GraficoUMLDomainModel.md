@startuml
' Impostiamo la direzione orizzontale
left to right direction

' Opzioni di stile generiche
skinparam backgroundcolor #FFFFFF
skinparam class {
  BackgroundColor #F8F8F8
  BorderColor #999999
  FontColor black
  ArrowColor #999999
}

' Nascondiamo i membri (campi/metodi) così da avere blocchi "vuoti"
hide members

' Dichiarazione delle classi (senza attributi/chiavi)
rectangle "Catalogo" as Catalogo
rectangle "Storia" as Storia
rectangle "Scenario" as Scenario
rectangle "Indovinello" as Indovinello
rectangle "Utente" as Utente
rectangle "Oggetto" as Oggetto
rectangle "Giocata" as Giocata
rectangle "Inventario" as Inventario

' Relazioni tra i concetti del dominio
Catalogo -- "1..*" Storia : "contiene"
Storia -- "1..*" Scenario : "composta da"
Storia -- "1" Utente : "scritta da"
Scenario -- "0..1" Indovinello : "può includere"
Scenario -- "0..*" Oggetto : "contiene/raccoglie"
Scenario --> "1..*" Scenario : "transizioni/diramazioni"
Utente -- "0..*" Giocata : "gioca"
Giocata -- "1" Storia : "riferita a"
Giocata -- "1" Inventario : "possiede"
Inventario -- "0..*" Oggetto : "contiene"

@enduml
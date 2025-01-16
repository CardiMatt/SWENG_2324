import { type Story } from '@/models/Story';

export function fetchStories(): Story[] {
    return [
      {
        id: 1,
        title: "La leggenda di Avalon",
        description: "Una storia epica di cavalieri, magia e avventura. Segui il percorso del giovane eroe...  Una storia epica di cavalieri, magia e avventura. Segui il percorso del giovane eroe...   Una storia epica di cavalieri, magia e avventura. Segui il percorso del giovane eroe...   Una storia epica di cavalieri, magia e avventura. Segui il percorso del giovane eroe... ",
        image: "https://via.placeholder.com/300",
        author: "Giovanni Rossi",
        genre: "Fantasy",
      },
      {
        id: 2,
        title: "La città sommersa",
        description: "Un viaggio incredibile in una città perduta sotto le onde, piena di misteri...",
        image: "https://via.placeholder.com/300",
        author: "Maria Bianchi",
        genre: "Avventura",
      },
      {
        id: 3,
        title: "Cronache del futuro",
        description: "Esplora un mondo distopico dove la tecnologia ha preso il controllo...",
        image: "https://via.placeholder.com/300",
        author: "Luigi Verdi",
        genre: "Sci-Fi",
      },
    ];
  }
// frontend\src\eventBus.ts
import mitt from 'mitt';
import type { MemoriConfig } from '@/models/GameSave';

// Definisci i tipi di eventi
type Events = {
  updateMemoriConfig: MemoriConfig;
};

// Crea l'istanza di mitt
const eventBus = mitt<Events>();

export default eventBus;

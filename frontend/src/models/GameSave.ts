// models/GameSave.ts

export interface MemoriConfig {
  context: string;
  initialQuestion: string;
}

export interface GameSave {
  id: string;
  userId: string;
  storyId: string;
  progress: string;
  inventory: string;
  saveDate: Date;

  memoriConfig: MemoriConfig;
}
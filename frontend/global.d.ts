// global.d.ts
declare global {
  interface Window {
    mountVueComponents: (className: string, vueComponent: any) => void;
    SalutoComponent: any;
    Vue: typeof import("vue").createApp; // Aggiungi Vue come riferimento all'app Vue
  }
}

export {};

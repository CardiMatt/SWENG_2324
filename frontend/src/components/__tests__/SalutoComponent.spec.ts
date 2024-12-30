import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SalutoComponent from '@/components/SalutoComponent.vue';
//@: Fa riferimento alla cartella src/ (verifica che il tuo alias sia configurato nel file vite.config.ts).

describe('SalutoComponent', () => {
  it('renders the input field and button', () => {
    const wrapper = mount(SalutoComponent);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('displays a greeting message when a name is entered and the button is clicked', async () => {
    const wrapper = mount(SalutoComponent);

    // Simula l'inserimento del nome
    const input = wrapper.find('input[type="text"]');
    await input.setValue('Mario');

    // Simula il click sul pulsante
    const button = wrapper.find('button');
    await button.trigger('click');

    // Verifica che il messaggio sia renderizzato
    expect(wrapper.text()).toContain('Ciao, Mario!');
  });

  it('displays an error message if no name is entered', async () => {
    const wrapper = mount(SalutoComponent);

    // Simula il click sul pulsante senza inserire il nome
    const button = wrapper.find('button');
    await button.trigger('click');

    // Verifica che il messaggio di errore sia renderizzato
    expect(wrapper.text()).toContain('Per favore, inserisci un nome.');
  });
});

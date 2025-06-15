import { type Directive } from 'vue';

export const DateMask: Directive = {
  mounted(el: HTMLInputElement) {
    el.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      let value = target.value.replace(/\D/g, '');

      if (value.length > 2) {
        value = `${value.slice(0, 2)}.${value.slice(2)}`;
      }
      if (value.length > 5) {
        value = `${value.slice(0, 5)}.${value.slice(5, 9)}`;
      }

      target.value = value;

      target.dispatchEvent(new Event('input'));
    });
  },
};

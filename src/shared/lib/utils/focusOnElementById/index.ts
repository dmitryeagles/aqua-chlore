const focusOnElementById = (id: string, preventScroll = false) => {
  const target = document.querySelectorAll<HTMLElement>(`#${CSS.escape(id)}`);

  // из-за специфики DynamicFormField и компонентов PrimeVue
  // может быть ситуация, что id передан 2 раза: компоненту и внутри него input
  (target[1] ?? target[0])?.focus({ preventScroll });
};

export default focusOnElementById;

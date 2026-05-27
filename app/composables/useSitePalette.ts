export function useSitePalette() {
  const isSunPalette = useState<boolean>('site-palette:is-sun', () => false);
  const initialized = useState<boolean>('site-palette:initialized', () => false);

  const applyClass = (value: boolean) => {
    if (!import.meta.client) return;
    document.documentElement.classList.toggle('home-palette-sun', value);
  };

  const initializePalette = () => {
    if (!import.meta.client) return;
    if (initialized.value) {
      applyClass(isSunPalette.value);
      return;
    }
    const requestedPalette = new URLSearchParams(window.location.search).get('palette');
    const isSun =
      requestedPalette === 'sun' || (requestedPalette !== 'default' && Math.random() < 0.3);
    isSunPalette.value = isSun;
    applyClass(isSun);
    initialized.value = true;
  };

  return { isSunPalette, initializePalette };
}

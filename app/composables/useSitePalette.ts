export function useSitePalette() {
  const isSunPalette = useState<boolean>('site-palette:is-sun', () => false);
  const initialized = useState<boolean>('site-palette:initialized', () => false);

  const updateThemeColor = () => {
    if (!import.meta.client) return;
    const themeColor = '#ffffff';
    const metas = Array.from(
      document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]'),
    );

    if (!metas.length) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
      metas.push(meta);
    }

    metas.forEach((meta) => {
      meta.content = themeColor;
    });
  };

  const applyClass = (value: boolean) => {
    if (!import.meta.client) return;
    document.documentElement.classList.toggle('home-palette-sun', value);
    updateThemeColor();
    window.requestAnimationFrame(updateThemeColor);
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

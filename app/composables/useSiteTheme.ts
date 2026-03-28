const THEME_STORAGE_KEY = 'portfolio-theme';

export function useSiteTheme() {
  const isDark = useState<boolean>('site-theme:is-dark', () => false);
  const initialized = useState<boolean>('site-theme:initialized', () => false);

  const darkButtonSrc = computed(() =>
    isDark.value
      ? '/assets/media/common/images/light-960.avif'
      : '/assets/media/common/images/dark-960.avif',
  );

  const footerLogoSrc = computed(() =>
    isDark.value
      ? '/assets/media/common/images/isaure-logo-W-960.avif'
      : '/assets/media/common/images/isaure-logo-B-960.avif',
  );

  const applyBodyTheme = (value: boolean) => {
    if (!import.meta.client) return;
    document.body.classList.toggle('dark-mode', value);
  };

  const setTheme = (value: boolean, persist = true) => {
    isDark.value = value;
    applyBodyTheme(value);

    if (persist && import.meta.client) {
      window.localStorage.setItem(THEME_STORAGE_KEY, value ? 'dark' : 'light');
    }
  };

  const initializeTheme = () => {
    if (!import.meta.client || initialized.value) return;

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const shouldUseDark =
      storedTheme === 'dark' ||
      (storedTheme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setTheme(shouldUseDark, false);
    initialized.value = true;
  };

  const toggleTheme = () => setTheme(!isDark.value);

  onMounted(() => {
    initializeTheme();
  });

  watch(isDark, (value) => {
    applyBodyTheme(value);
  });

  return {
    isDark,
    darkButtonSrc,
    footerLogoSrc,
    setTheme,
    toggleTheme,
    initializeTheme,
  };
}

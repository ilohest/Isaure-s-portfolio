/**
 * Shared reactive theme-color state.
 * The layout reads it; individual pages can override it.
 * Default: #f8f8f6 (site base background — blends with most pages).
 */
export const useThemeColor = () =>
  useState<string>('site:theme-color', () => '#f8f8f6');

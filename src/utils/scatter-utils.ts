type RectBox = { left: number; right: number; top: number; bottom: number };

export const hashString = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

export const boxesOverlap = (a: RectBox, b: RectBox): boolean =>
  a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

type CenterProtectedRectOptions = {
  horizontalInsetRatio?: number;
  minHorizontalInset?: number;
  maxHorizontalInset?: number;
  verticalInsetRatio?: number;
  minVerticalInset?: number;
  maxVerticalInset?: number;
};

export const getCenterProtectedRect = (
  rect: RectBox,
  {
    horizontalInsetRatio = 0.22,
    minHorizontalInset = 24,
    maxHorizontalInset = 120,
    verticalInsetRatio = 0.06,
    minVerticalInset = 0,
    maxVerticalInset = 14,
  }: CenterProtectedRectOptions = {},
): RectBox => {
  const width = Math.max(0, rect.right - rect.left);
  const height = Math.max(0, rect.bottom - rect.top);
  const horizontalInset = Math.min(
    Math.max(width * horizontalInsetRatio, minHorizontalInset),
    Math.max(0, Math.min(maxHorizontalInset, width / 2 - 1)),
  );
  const verticalInset = Math.min(
    Math.max(height * verticalInsetRatio, minVerticalInset),
    Math.max(0, Math.min(maxVerticalInset, height / 2 - 1)),
  );

  return {
    left: rect.left + horizontalInset,
    right: rect.right - horizontalInset,
    top: rect.top + verticalInset,
    bottom: rect.bottom - verticalInset,
  };
};

export const getParallaxScrollTop = (target: Window | HTMLElement | null | undefined): number => {
  if (typeof window === 'undefined') return 0;
  if (!target || target === window) {
    return window.scrollY || window.pageYOffset || 0;
  }
  if ('scrollTop' in target) {
    return target.scrollTop || 0;
  }
  return 0;
};

export const isDesktopScatter = (minWidth = 971): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(`(min-width: ${minWidth}px)`).matches;
};

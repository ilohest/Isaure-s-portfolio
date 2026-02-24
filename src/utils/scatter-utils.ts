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

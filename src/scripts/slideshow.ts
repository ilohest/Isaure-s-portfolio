// Carrousel auto cross-fade (port de la rotation TioLinaris). Cycle la classe
// .is-active sur les .tio-loop-slide d'un conteneur [data-slideshow].
type Frame = HTMLElement & { _int?: number; _idx?: number };

const start = (frame: Frame) => {
  const slides = frame.querySelectorAll<HTMLElement>('.tio-loop-slide');
  if (slides.length <= 1) return;
  if (frame._int) window.clearInterval(frame._int);
  frame._idx = 0;
  slides.forEach((s, i) => s.classList.toggle('is-active', i === 0));
  frame._int = window.setInterval(() => {
    slides[frame._idx ?? 0].classList.remove('is-active');
    frame._idx = ((frame._idx ?? 0) + 1) % slides.length;
    slides[frame._idx].classList.add('is-active');
  }, 1000);
};

const setup = () => document.querySelectorAll<Frame>('[data-slideshow]').forEach(start);
const teardown = () =>
  document.querySelectorAll<Frame>('[data-slideshow]').forEach((f) => {
    if (f._int) window.clearInterval(f._int);
  });

document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', teardown);
if (document.readyState !== 'loading') setup();

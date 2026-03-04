<template>
  <section
    class="relative container mx-auto flex flex-col gap-4 px-4 py-4 md:top-[40px] md:px-6 md:py-8"
  >
    <div class="flex items-center justify-between">
      <Button
        label="Back to projects"
        icon="pi pi-arrow-left"
        text
        class="btn-link"
        @click="$router.push('/achievements')"
      />
    </div>

    <Card
      class="project-summary-card bg-[var(--surface-muted)] text-[var(--text-secondary)] shadow-none"
    >
      <template #content>
        <div class="flex flex-col gap-4 p-4 md:p-6">
          <h2 class="font-display m-0 text-4xl uppercase">
            Private event operations dashboard (Wedding Edition)
          </h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              I designed and built an elegant, private wedding invitation website showcasing
              hand‑drawn illustrations, with subtle animations, all key event details, and a
              dedicated RSVP experience for guests to confirm attendance, plus‑ones, dietary needs,
              and notes. To protect guests’ privacy, access is secured with a shared password.
            </p>
            <p class="mt-4">
              Behind the scenes, the back office is a full operations dashboard built to run the
              wedding end‑to‑end. It centralizes guest responses (RSVP status, plus‑ones, comments)
              and dietary requirements, and provides tools to plan seating arrangements and generate
              printable exports for vendors and on‑site coordination. Organizers can manage a
              structured timeline/agenda, track budget items, curate a shared playlist, and publish
              updates through a lightweight blog. The dashboard also includes email tooling
              (targeted sends, delivery history), role‑based access, and an AI assistant to
              streamline planning and day‑to‑day organization, with a super‑admin area to manage
              users, permissions, and invitation links for onboarding additional organizers.
            </p>
          </div>

          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div class="md:w-8/12">
              <h2 class="mb-3 text-xl tracking-wide uppercase">Responsibilities</h2>
              <p class="font-['Red_Hat_Text'] font-light">
                Product design &amp; technical architecture, front-end development, back-end/API
                development, database &amp; authentication integration, custom illustration
                integration, UI/UX implementation, security &amp; access control, deployment and
                server setup, website launch, post-launch support.
              </p>
            </div>

            <div class="md:w-4/12 md:pl-10">
              <div class="flex flex-col gap-8">
                <div>
                  <h2 class="mb-3 text-xl tracking-wide uppercase">URL</h2>
                  <a
                    href="https://www.natalia-y-mauricio.com/"
                    target="_blank"
                    class="font-['Red_Hat_Text'] font-light text-inherit"
                  >
                    natalia-y-mauricio.com
                  </a>
                </div>

                <div>
                  <h2 class="mb-3 text-xl tracking-wide uppercase">Credits</h2>
                  <p class="font-['Red_Hat_Text'] font-light">
                    Illustrations by La Invitación de Liana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <div class="mt-4 grid gap-4">
      <div class="flex justify-center">
        <img
          src="/assets/media/common/legacy-img/web-dev/boda-natalia-mauricio/bodanm-desktop1-960.avif"
          alt="Wedding website — mockup 2"
          class="border-round-xl eventdash-img block h-auto w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="flex justify-center">
        <img
          src="/assets/media/common/legacy-img/web-dev/boda-natalia-mauricio/bodanm-desktop6-960.avif"
          alt="Wedding website — mockup 1"
          class="border-round-xl eventdash-img block h-auto w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="flex justify-center">
        <img
          src="/assets/media/common/legacy-img/web-dev/boda-natalia-mauricio/bodanm-mockup1-960.avif"
          alt="Wedding website — phone mockup"
          class="border-round-xl eventdash-img block h-auto w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>

    <section class="mt-10">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="font-display m-0 text-2xl text-[var(--text-primary)] uppercase">
          Back‑office highlights
        </h2>
        <p class="mt-2 font-['Red_Hat_Text'] font-light">
          A quick tour of the tools used to run a private wedding end‑to‑end.
        </p>
      </div>

      <div class="bento-grid mt-6">
        <article class="feature-card js-slide-item slide-from-left">
          <div class="slide-content">
            <video
              class="feature-media"
              src="/media/videos/private-events-dashboard-home.mp4"
              playsinline
              autoplay
              loop
              muted
              preload="metadata"
            ></video>
            <div class="feature-copy">
              <h3>Digital invitation experience</h3>
              <p>
                An elegant private invitation website designed around bespoke, hand‑drawn
                illustrations to match each couple’s world.
              </p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-right">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-dashboard-960.avif"
              alt="Admin dashboard overview"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>Dashboard &amp; Metrics</h3>
              <p>
                Track RSVPs, attendance totals, and key planning metrics at a glance—so you can spot
                changes quickly and stay on top of what matters most.
              </p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-left">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-rsvp-960.avif"
              alt="RSVP management screen"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>RSVP Management</h3>
              <p>Review guest responses, plus‑ones, and notes—without chasing spreadsheets.</p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-right">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-diets-960.avif"
              alt="Dietary requirements management"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>Dietary Requirements</h3>
              <p>Collect allergies and preferences, then export clean summaries for vendors.</p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-left">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-seating-960.avif"
              alt="Seating plan editor"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>Seating Plan</h3>
              <p>Build table assignments and generate print‑ready seating outputs.</p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-right">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-playlist-960.avif"
              alt="Playlist management"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>Playlist Curation</h3>
              <p>Gather song requests and curate the soundtrack in one place.</p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-left">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-blog-960.avif"
              alt="Blog administration"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>Blog / Updates</h3>
              <p>Publish guest‑facing updates through a lightweight blog feed.</p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-right">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-email-960.avif"
              alt="Email tooling screen"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>Email Center</h3>
              <p>Send targeted messages and review delivery history when needed.</p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-left">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-weddingplanner-960.avif"
              alt="Wedding planner workspace"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>Wedding Planner</h3>
              <p>Turn ideas into actionable tasks—with built‑in assistance to speed up planning.</p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-right">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-rsvp-form-960.avif"
              alt="RSVP form preview"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>Guest RSVP Experience</h3>
              <p>A guided RSVP flow for guests (attendance, plus‑ones, dietary needs, notes).</p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-left">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-budget-960.avif"
              alt="Budget tracking dashboard"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>Budget Tracking</h3>
              <p>Track expenses, categories, and payments to keep the budget under control.</p>
            </div>
          </div>
        </article>

        <article class="feature-card js-slide-item slide-from-right">
          <div class="slide-content">
            <img
              class="feature-media"
              src="/assets/media/projects/web-dev/private-events-dashboard/highlights/admin-agenda-960.avif"
              alt="Agenda and timeline editor"
              loading="lazy"
              decoding="async"
            />
            <div class="feature-copy">
              <h3>Agenda / Timeline</h3>
              <p>
                Organize the wedding day step by step, define schedules, assign responsibilities,
                and visualize the entire planning at a glance.
              </p>
            </div>
          </div>
        </article>

        <article class="cta-card feature-card js-slide-item slide-from-left">
          <div class="slide-content">
            <h3 class="cta-question font-display text-xl uppercase">
              Planning a wedding and want a digital invitation that actually saves you time?
            </h3>
            <p class="cta-text font-['Red_Hat_Text'] font-light">
              Get a bespoke illustrated invitation site plus a private operations dashboard to
              handle RSVPs, seating, emails, and planning—smoothly and securely.
            </p>
            <Button
              label="Request a demo"
              icon="pi pi-envelope"
              class="cta-button"
              @click="goToContact('couple')"
            />
          </div>
        </article>

        <article class="cta-card feature-card js-slide-item slide-from-right">
          <div class="slide-content">
            <h3 class="cta-question font-display text-xl uppercase">
              Are you a design studio or stationery brand looking to offer more than printed
              invitations?
            </h3>
            <p class="cta-text font-['Red_Hat_Text'] font-light">
              Bring your custom illustrations into my platform and deliver a premium bundle: a
              stunning invitation website paired with a full guest‑management dashboard.
            </p>
            <Button
              label="Let’s talk partnership"
              icon="pi pi-send"
              class="cta-button"
              @click="goToContact('agency')"
            />
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';

export default {
  name: 'EventDashboardProject',
  components: { Card, Button },
  data() {
    return {
      slideObserver: null,
      slideScrollHandler: null,
      slideScrollTarget: null,
    };
  },
  methods: {
    goToContact(audience) {
      const subject =
        audience === 'agency'
          ? 'Private event operations dashboard (Wedding Edition) — Collaboration'
          : 'Private event operations dashboard (Wedding Edition) — Demo / inquiry';

      const message =
        audience === 'agency'
          ? 'Hi Isaure,\\n\\nI’m an agency/studio and I’d love to discuss a collaboration around illustrated wedding stationery worlds (assets, theme, animation/motion details, admin UX).\\n\\nContext:\\n- Wedding date:\\n- Style / references:\\n- Deliverables:\\n\\nThank you!'
          : 'Hi Isaure,\\n\\nI’m planning my wedding and I’m interested in a private invitation website + an operations dashboard (RSVP, seating plan exports, emails, budget, timeline, tasks).\\n\\nContext:\\n- Wedding date:\\n- Languages:\\n- Must-have features:\\n\\nThank you!';

      this.$router.push({
        path: '/contact',
        query: { subject, message, audience },
      });
    },
  },
  mounted() {
    window.scrollTo(0, 0);

    if (typeof window === 'undefined') return;
    this.$el?.classList?.add?.('enable-slide');
    const slideItems = Array.from(this.$el?.querySelectorAll?.('.js-slide-item') ?? []);
    if (!slideItems.length) return;

    const scrollerCandidate = document.querySelector('main[data-scroll-container]');
    const scroller = scrollerCandidate instanceof HTMLElement ? scrollerCandidate : window;

    const markIfVisibleNow = () => {
      slideItems.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
        if (inView) el.classList.add('is-in');
      });
    };

    markIfVisibleNow();

    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        scrollTicking = false;
        markIfVisibleNow();
      });
    };

    if (scroller && scroller !== window)
      scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    this.slideScrollHandler = onScroll;
    this.slideScrollTarget = scroller;

    if (typeof window.IntersectionObserver !== 'function') {
      slideItems.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const root = scroller instanceof HTMLElement ? scroller : null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { root, threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    );

    slideItems.forEach((el) => observer.observe(el));
    this.slideObserver = observer;
  },
  beforeUnmount() {
    this.slideObserver?.disconnect();
    this.slideObserver = null;
    if (typeof window === 'undefined') return;
    if (this.slideScrollHandler) {
      window.removeEventListener('scroll', this.slideScrollHandler);
      window.removeEventListener('resize', this.slideScrollHandler);
      if (this.slideScrollTarget instanceof HTMLElement) {
        this.slideScrollTarget.removeEventListener('scroll', this.slideScrollHandler);
      }
    }
    this.slideScrollHandler = null;
    this.slideScrollTarget = null;
  },
};
</script>

<style scoped>
.cta-question {
  margin: 0;
  line-height: 1.15;
}

.cta-text {
  margin: 0;
  opacity: 0.92;
}

.cta-card .slide-content {
  background: var(--surface-accent);
  color: var(--text-inverse);
  border-radius: var(--image-radius);
  padding: 26px 26px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cta-card .cta-question,
.cta-card .cta-text {
  color: var(--text-inverse);
}

.cta-button {
  align-self: flex-start;
  background: #fff !important;
  border: 1px solid #fff !important;
  color: var(--surface-accent) !important;
}

.cta-button:hover {
  background: color-mix(in oklab, #fff, transparent 8%) !important;
  border-color: color-mix(in oklab, #fff, transparent 8%) !important;
}

.eventdash-img {
  max-width: 550px;
}

@media (prefers-reduced-motion: reduce) {
  .js-slide-item,
  .js-slide-item .slide-content,
  .js-slide-item.is-in .slide-content {
    transition: none;
    transform: none;
    opacity: 1 !important;
  }
}

.feature-card {
  width: 100%;
  max-width: 550px;
}

.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2.25rem;
  column-gap: 0.75rem;
  justify-items: center;
}

@media (min-width: 640px) {
  .bento-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }
}

.enable-slide .slide-content {
  opacity: 0;
  transition:
    transform 720ms cubic-bezier(0.2, 0.9, 0.2, 1),
    opacity 520ms ease-out;
  will-change: transform, opacity;
}

.enable-slide .slide-from-left .slide-content {
  transform: translateX(-80vw);
}

.enable-slide .slide-from-right .slide-content {
  transform: translateX(80vw);
}

.enable-slide .js-slide-item.is-in .slide-content {
  transform: translateX(0);
  opacity: 1;
}

.feature-media {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: var(--image-radius);
  background: var(--surface-muted);
}

video.feature-media {
  border-top: 2px solid var(--surface-muted);
  border-left: 2px solid var(--surface-muted);
  border-right: 2px solid var(--surface-muted);
}

.feature-copy {
  border-radius: var(--image-radius);
  background: var(--surface-muted);
  color: var(--text-primary);
  padding: 22px 22px 24px;
}

.feature-copy h3 {
  margin: 0;
  font-family: var(--font-family-display);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 1.3rem;
  color: var(--text-primary);
}

.feature-copy p {
  margin: 14px 0 0;
  font-family: 'Red Hat Text';
  font-weight: 300;
  color: var(--text-primary);
}
</style>

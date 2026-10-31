/**
 * Rationalise les Services : 54 → 22.
 *  - crée / renomme les services conservés (nom FR + EN) ;
 *  - remplace, dans tous les projets (brouillons compris), chaque ancien service par son équivalent (sans doublon) ;
 *  - supprime les anciens services devenus inutiles (et deux services propres à un projet : voir DROPPED).
 *
 *   cd studio
 *   npx sanity exec scripts/rationalize-services.ts --with-user-token -- --dry   # aperçu
 *   npx sanity exec scripts/rationalize-services.ts --with-user-token            # applique
 *
 * À lancer APRÈS weaken-service-refs.ts (les références sont alors faibles, la suppression ne bloque pas).
 */
import { getCliClient } from 'sanity/cli';
import { randomUUID } from 'node:crypto';

const dry = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2025-01-01' });

const P = 'service-';

/** Services conservés : id (sans préfixe), nom FR, nom EN, et anciens services fusionnés dedans. */
const KEEP: { id: string; fr: string; en: string; from?: string[] }[] = [
  { id: 'art-direction', fr: 'Direction artistique', en: 'Art direction' },
  { id: 'visual-identity', fr: 'Identité visuelle', en: 'Visual identity', from: ['visual-identity-brand-illustration', 'logo-design', 'logo-system'] },
  { id: 'brand-applications', fr: 'Déclinaisons de marque', en: 'Brand applications', from: ['social-network-templates'] },
  { id: 'editorial-design', fr: 'Design éditorial', en: 'Editorial design', from: ['layout-system'] },
  { id: 'web-design', fr: 'Design web', en: 'Web design', from: ['web-design-personalization', 'design-system'] },
  { id: 'ux-ui-design', fr: 'Design UX/UI', en: 'UX/UI design', from: ['ui-ux'] },
  { id: 'animation-design', fr: 'Design d’animation', en: 'Animation design' },
  { id: 'custom-illustration-integration', fr: 'Intégration d’illustrations sur mesure', en: 'Custom illustration integration' },
  { id: 'photography', fr: 'Photographie', en: 'Photography', from: ['on-site-photography-retouching'] },
  { id: 'content-architecture', fr: 'Architecture de contenu', en: 'Content architecture', from: ['content-structure', 'page-hierarchy-navigation', 'product-collection-architecture'] },
  { id: 'product-design-technical-architecture', fr: 'Conception produit & architecture technique', en: 'Product design & technical architecture' },
  { id: 'site-development', fr: 'Développement du site', en: 'Site development', from: ['site-development-and-features-personalization', 'full-stack-site-development', 'custom-functionality-interactions'] },
  { id: 'front-end-development', fr: 'Développement front-end', en: 'Front-end development', from: ['html-css-javascript-development', 'responsive-optimization', 'masonry-gallery-development', 'media-gallery-integration'] },
  { id: 'back-end-api-development', fr: 'Développement back-end/API', en: 'Back-end/API development', from: ['database-authentication', 'security-access-control'] },
  { id: 'e-commerce-integration', fr: 'Développement e-commerce', en: 'E-Commerce development', from: ['secure-payment-gateway'] },
  { id: 'multilingual-site', fr: 'Site multilingue', en: 'Multilingual site', from: ['multilingual-routing', 'multilingual-frontend-development'] },
  { id: 'accessibility', fr: 'Accessibilité', en: 'Accessibility' },
  { id: 'seo-optimization-for-improved-visibility', fr: 'Optimisation SEO', en: 'SEO optimization', from: ['local-seo'] },
  { id: 'hosting-deployment', fr: 'Hébergement & déploiement', en: 'Hosting & deployment', from: ['server-side-setup', 'hosting-and-domain-configuration', 'domain-vercel-deployment', 'deployment-server-setup'] },
  { id: 'website-launch', fr: 'Lancement du site', en: 'Website launch', from: ['launch'] },
  { id: 'post-launch-support', fr: 'Support après lancement', en: 'Post-launch support' },
  { id: 'client-training-on-back-office-management', fr: 'Formation du client à la gestion du back-office', en: 'Client training on back-office management' },
];

/** Anciens services qui couvrent deux choses : le projet reçoit les deux nouveaux. */
const SPLIT: Record<string, string[]> = {
  'domain-setup-website-launch': ['hosting-deployment', 'website-launch'],
  'launch-post-launch-support': ['website-launch', 'post-launch-support'],
};

/** Supprimés sans équivalent (phrase générique en anglais, crédit propre à un projet). */
const DROPPED = [
  'client-collaboration-with-continuous-communication-and-feedback-integration-throughout-the-project-lifecycle',
  'collaboration-with-brand-designer-lara-gonzalez',
];

// ancien id → nouveaux ids (vide = supprimé)
const MAP = new Map<string, string[]>();
for (const k of KEEP) for (const old of k.from ?? []) MAP.set(P + old, [P + k.id]);
for (const [old, targets] of Object.entries(SPLIT)) MAP.set(P + old, targets.map((t) => P + t));
for (const old of DROPPED) MAP.set(P + old, []);

type Ref = { _key?: string; _ref?: string; _weak?: boolean; _type?: string };
type Doc = { _id: string; title?: string; services?: Ref[] };

const run = async () => {
  const existing = await client.fetch<{ _id: string; title: string }[]>(`*[_type == "service"]{ _id, title }`);
  const existingIds = new Set(existing.map((s) => s._id));
  const keepIds = new Set(KEEP.map((k) => P + k.id));

  const unknown = [...MAP.keys()].filter((id) => !existingIds.has(id));
  if (unknown.length) console.warn('⚠ ancien(s) service(s) introuvable(s), ignoré(s) :', unknown.join(', '));
  const unmapped = existing.filter((s) => !keepIds.has(s._id) && !MAP.has(s._id) && !s._id.startsWith('drafts.'));
  if (unmapped.length) {
    console.error('✖ services ni conservés ni fusionnés (à traiter avant) :\n' + unmapped.map((s) => `  - ${s._id} (${s.title})`).join('\n'));
    process.exit(1);
  }

  const docs = await client.fetch<Doc[]>(`*[_type == "project" && defined(services)]{ _id, title, services }`);
  let tx = client.transaction();
  let touched = 0;

  for (const d of docs) {
    const next: Ref[] = [];
    const seen = new Set<string>();
    const push = (ref: string, from?: Ref) => {
      if (seen.has(ref)) return;
      seen.add(ref);
      next.push({ _type: 'reference', _key: from?._key && from._ref === ref ? from._key : randomUUID().slice(0, 12), _ref: ref, _weak: true });
    };
    for (const r of d.services ?? []) {
      if (!r._ref) continue;
      const targets = MAP.get(r._ref);
      if (targets) targets.forEach((t) => push(t));
      else push(r._ref, r);
    }
    const before = (d.services ?? []).map((r) => r._ref).join('|');
    const after = next.map((r) => r._ref).join('|');
    if (before === after) continue;
    touched++;
    if (dry && touched <= 3) console.log(`  ${d._id} : ${d.services?.length ?? 0} → ${next.length} services`);
    tx = tx.patch(d._id, (p) => p.set({ services: next }));
  }

  for (const k of KEEP) {
    const id = P + k.id;
    tx = tx.createIfNotExists({ _id: id, _type: 'service', title: k.fr, titleEn: k.en }).patch(id, (p) => p.set({ title: k.fr, titleEn: k.en }));
  }
  const toDelete = existing.filter((s) => MAP.has(s._id)).map((s) => s._id);
  for (const id of toDelete) tx = tx.delete(id);

  console.log(`${touched} projet(s) à mettre à jour · ${KEEP.length} services conservés (créés/renommés si besoin) · ${toDelete.length} ancien(s) service(s) supprimé(s).`);
  if (dry) return console.log('Aperçu seulement : rien n’a été écrit.');
  await tx.commit();
  console.log('Terminé.');
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

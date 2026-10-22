/**
 * Anonymise le projet « professional-platform » (ex client-lawyer-platform) dans Sanity :
 * nouveau slug, titre, résumé, secteur, mots-clés, couverture neutre, galerie vidée, textes de page traduits,
 * puis suppression des anciens fichiers image. Les ids de documents restent inchangés (le site n'utilise plus l'_id).
 *
 *   cd studio
 *   npx sanity exec scripts/anonymize-professional-platform.ts --with-user-token -- --dry    # aperçu
 *   npx sanity exec scripts/anonymize-professional-platform.ts --with-user-token             # applique
 */
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { getCliClient } from 'sanity/cli';

const dry = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2025-01-01' });
const OLD = 'client-lawyer-platform';
const NEW = 'professional-platform';
const COVER = resolve(process.env.COVER_FILE ?? '../../_originaux-projet-confidentiel/cover-neutre.png');

// même clé que src/lib/project-copy.ts
const keyOf = (s: string) => createHash('md5').update(s.replace(/\s+/g, ' ').trim()).digest('hex').slice(0, 12);

const FR: [string, string][] = [
  ['I designed and developed a platform that brings clients, professionals and their teams into the same case file while giving each role a different level of information and control.', 'J’ai conçu et développé une plateforme qui réunit clients, professionnels et équipes autour d’un même dossier, avec pour chaque rôle un niveau d’information et de contrôle différent.'],
  ['Multi-role web platform', 'Plateforme web multi-rôles'],
  ['I led the project team while contributing hands-on to the design of the business workflows, the UX/UI and the full-stack development of the platform, including role-based experiences, confidential document handling, real-time updates and scheduling.', 'J’ai dirigé l’équipe projet tout en participant concrètement à la conception des flux métier, à l’UX/UI et au développement full-stack de la plateforme, y compris les expériences par rôle, la gestion des documents confidentiels, les mises à jour en temps réel et la planification.'],
  ['Project context', 'Contexte du projet'],
  ['The platform brings together consultations, appointments, written deliverables, documents, fees and payments. These activities are closely connected, but they are not viewed or handled in the same way by everyone involved.', 'La plateforme rassemble consultations, rendez-vous, livrables écrits, documents, honoraires et paiements. Ces activités sont étroitement liées, mais elles ne sont pas vues ni traitées de la même façon par chaque intervenant.'],
  ['I used the case file as the central organising unit. Conversations, dates, documents, financial actions and professional work all connect back to it, while permissions determine what each person can see and do.', 'J’ai fait du dossier l’unité centrale d’organisation. Conversations, dates, documents, actions financières et travail professionnel s’y rattachent, tandis que les permissions déterminent ce que chacun peut voir et faire.'],
  ['Selected design decisions', 'Choix de conception clés'],
  ['One case file, several views: I structured the product around a shared case file, then adapted its information and actions to each role and permission level.', 'Un dossier, plusieurs vues : j’ai structuré le produit autour d’un dossier partagé, puis adapté ses informations et ses actions à chaque rôle et niveau de permission.'],
  ['Plain language first: The intake starts with an everyday situation or a description in the user’s own words, rather than requiring specialist terminology.', 'Le langage courant d’abord : la prise en charge démarre par une situation du quotidien ou une description avec les mots de l’utilisateur, sans exiger de vocabulaire spécialisé.'],
  ['Visible next steps: Statuses, deadlines and pending actions make long processes easier to scan without flattening their complexity.', 'Des prochaines étapes visibles : statuts, échéances et actions en attente rendent les processus longs plus lisibles, sans en gommer la complexité.'],
  ['Scoped collaboration: Delegation is attached to a specific task, preserving both confidentiality and traceability.', 'Une collaboration cadrée : la délégation est rattachée à une tâche précise, ce qui préserve à la fois la confidentialité et la traçabilité.'],
  ['Technical approach', 'Approche technique'],
  ['Product interface: Vue 3, TypeScript, Pinia, PrimeVue, Vue I18n, FullCalendar and Socket.IO.', 'Interface du produit : Vue 3, TypeScript, Pinia, PrimeVue, Vue I18n, FullCalendar et Socket.IO.'],
  ['Application architecture: Node.js, Express, PostgreSQL, Drizzle and shared domain rules used by the frontend and backend.', 'Architecture applicative : Node.js, Express, PostgreSQL, Drizzle et des règles métier partagées entre le front-end et le back-end.'],
  ['Security & reliability: Case-level access control, runtime validation, MFA flows, file validation, antivirus scanning, monitoring and automated tests.', 'Sécurité et fiabilité : contrôle d’accès au niveau du dossier, validation à l’exécution, parcours MFA, validation des fichiers, analyse antivirus, supervision et tests automatisés.'],
  ['Business workflows: Structured states, scheduling rules, real-time updates and generated documents support case files as they progress over time.', 'Flux métier : états structurés, règles de planification, mises à jour en temps réel et documents générés accompagnent les dossiers au fil de leur avancement.'],
];

const COMMON = { slug: { _type: 'slug', current: NEW }, title: 'Multi-role Professional Platform', gallery: [] as unknown[] };
const BY_LANG = {
  fr: { summary: 'Une plateforme sécurisée entre clients et professionnels.', sector: 'Professions réglementées', keywords: ['Web design', 'Plateforme web'], pageTexts: FR.map(([en, fr]) => ({ _type: 'object', _key: keyOf(en), text: fr })) },
  en: { summary: 'A secure platform between clients and professionals.', sector: 'Regulated professions', keywords: ['Web design', 'Web platform'], pageTexts: [] as unknown[] },
} as const;

const main = async () => {
  const docs = await client.fetch<{ _id: string; language: 'fr' | 'en'; cover?: { asset?: { _ref: string } }; gallery?: { image?: { asset?: { _ref: string } } }[]; video?: { asset?: { _ref: string } } }[]>(
    `*[_type == "project" && slug.current == $slug]`,
    { slug: OLD },
  );
  if (!docs.length) throw new Error(`Aucun projet avec le slug ${OLD}`);
  const oldAssets = new Set<string>();
  for (const d of docs) {
    if (d.cover?.asset?._ref) oldAssets.add(d.cover.asset._ref);
    d.gallery?.forEach((g) => g.image?.asset?._ref && oldAssets.add(g.image.asset._ref));
    if (d.video?.asset?._ref) oldAssets.add(d.video.asset._ref);
  }
  console.log(`${docs.length} documents, ${oldAssets.size} fichiers à supprimer :`, [...oldAssets]);
  if (dry) return console.log('--dry : rien n’est modifié.');

  const cover = await client.assets.upload('image', createReadStream(COVER), { filename: 'professional-platform-cover.png' });
  for (const d of docs) {
    await client
      .patch(d._id)
      .set({ ...COMMON, ...BY_LANG[d.language], cover: { _type: 'image', asset: { _type: 'reference', _ref: cover._id } } })
      .unset(['video', 'videoUrl'])
      .commit();
    console.log(`✓ ${d._id} (${d.language})`);
  }
  for (const id of oldAssets) {
    try {
      await client.delete(id);
      console.log(`✓ supprimé ${id}`);
    } catch (e) {
      console.warn(`⚠ ${id} non supprimé (encore référencé ?) :`, (e as Error).message);
    }
  }
};
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

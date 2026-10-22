/**
 * Met à jour les textes de la page « professional-platform » dans Sanity (traductions françaises).
 * Les clés sont celles du texte anglais du composant : à relancer chaque fois que ces textes changent.
 *
 *   cd studio
 *   npx sanity exec scripts/set-professional-platform-texts.ts --with-user-token -- --dry
 *   npx sanity exec scripts/set-professional-platform-texts.ts --with-user-token
 */
import { createHash } from 'node:crypto';
import { getCliClient } from 'sanity/cli';

const dry = process.argv.includes('--dry');
const client = getCliClient({ apiVersion: '2025-01-01' });
const SLUG = 'professional-platform';

// même clé que src/lib/project-copy.ts
const keyOf = (s: string) => createHash('md5').update(s.replace(/\s+/g, ' ').trim()).digest('hex').slice(0, 12);

const FR: [string, string][] = [
  ['Multi-role Professional Platform', 'Plateforme professionnelle multi-rôles'],
  ['I designed and developed a platform that brings clients, professionals and their teams into the same case file while giving each role a different level of information and control.', 'J’ai conçu et développé une plateforme qui réunit clients, professionnels et équipes autour d’un même dossier, avec pour chaque rôle un niveau d’information et de contrôle différent.'],
  ['Multi-role web platform', 'Plateforme web multi-rôles'],
  ['Project context', 'Contexte du projet'],
  ['I led the project team while contributing hands-on to the design of the business workflows, the UX/UI and the full-stack development of the platform, including role-based experiences, confidential document handling, real-time updates and scheduling.', 'J’ai dirigé l’équipe projet tout en participant concrètement à la conception des flux métier, à l’UX/UI et au développement full-stack de la plateforme, y compris les expériences par rôle, la gestion des documents confidentiels, les mises à jour en temps réel et la planification.'],
  ['The platform brings together consultations, appointments, written deliverables, documents, fees and payments. These activities are closely connected, but they are not viewed or handled in the same way by everyone involved.', 'La plateforme rassemble consultations, rendez-vous, livrables écrits, documents, honoraires et paiements. Ces activités sont étroitement liées, mais elles ne sont pas vues ni traitées de la même façon par chaque intervenant.'],
  ['I used the case file as the central organising unit. Conversations, dates, documents, financial actions and professional work all connect back to it, while permissions determine what each person can see and do.', 'J’ai fait du dossier l’unité centrale d’organisation. Conversations, dates, documents, actions financières et travail professionnel s’y rattachent, tandis que les permissions déterminent ce que chacun peut voir et faire.'],
  ['What I did', 'Ce que j’ai fait'],
  ['I like to start from the people rather than the screens: understanding how each role works day to day, in their own words, and turning that into clear workflows before drawing any interface.', 'J’aime partir des personnes plutôt que des écrans : comprendre comment chaque rôle travaille au quotidien, avec ses propres mots, et en faire des parcours clairs avant de dessiner la moindre interface.'],
  ['I took part in the design of those workflows and of the UX/UI, then built the product end to end: interface, API, database, real-time layer, e-mail notifications and generated PDF documents.', 'J’ai participé à la conception de ces parcours et de l’UX/UI, puis construit le produit de bout en bout : interface, API, base de données, temps réel, notifications par e-mail et documents PDF générés.'],
  ['The platform is bilingual, so every label, message and notification had to work for different audiences from day one.', 'La plateforme est bilingue : chaque libellé, message et notification devait donc convenir à des publics différents dès le premier jour.'],
  ['Selected design decisions', 'Choix de conception clés'],
  ['One case file, several views: I structured the product around a shared case file, then adapted its information and actions to each role and permission level.', 'Un dossier, plusieurs vues : j’ai structuré le produit autour d’un dossier partagé, puis adapté ses informations et ses actions à chaque rôle et niveau de permission.'],
  ['Plain language first: The intake starts with an everyday situation or a description in the user’s own words, rather than requiring specialist terminology.', 'Le langage courant d’abord : la prise en charge démarre par une situation du quotidien ou une description avec les mots de l’utilisateur, sans exiger de vocabulaire spécialisé.'],
  ['Visible next steps: Statuses, deadlines and pending actions make long processes easier to scan without flattening their complexity.', 'Des prochaines étapes visibles : statuts, échéances et actions en attente rendent les processus longs plus lisibles, sans en gommer la complexité.'],
  ['Scoped collaboration: Delegation is attached to a specific task, preserving both confidentiality and traceability.', 'Une collaboration cadrée : la délégation est rattachée à une tâche précise, ce qui préserve à la fois la confidentialité et la traçabilité.'],
  ['Behind the screens', 'Derrière les écrans'],
  ['A product like this holds sensitive documents and money, so a large part of the work happens where users never look: who can open what, what happens when two people act at the same moment, and how the system recovers when something fails.', 'Un produit comme celui-ci manipule des documents sensibles et de l’argent : une grande partie du travail se joue là où les utilisateurs ne regardent jamais — qui peut ouvrir quoi, ce qui se passe quand deux personnes agissent au même instant, et comment le système se rétablit quand quelque chose échoue.'],
  ['After the first version, I ran a systematic hardening campaign: dozens of written audit rounds covering access rules, data integrity, concurrency, input validation, file handling and monitoring. Each round ended with documented findings, fixes and automated tests, so the next person can see not only how things work but why.', 'Après la première version, j’ai mené une campagne de renforcement systématique : des dizaines de tours d’audit écrits sur les règles d’accès, l’intégrité des données, la concurrence, la validation des entrées, la gestion des fichiers et la supervision. Chaque tour se terminait par des constats documentés, des corrections et des tests automatisés, pour que la personne suivante comprenne non seulement comment les choses fonctionnent, mais pourquoi.'],
  ['Technical approach', 'Approche technique'],
  ['Product interface: Vue 3, TypeScript, Pinia, PrimeVue, Vue I18n, FullCalendar and Socket.IO.', 'Interface du produit : Vue 3, TypeScript, Pinia, PrimeVue, Vue I18n, FullCalendar et Socket.IO.'],
  ['Application architecture: Node.js, Express, TypeScript, PostgreSQL, Drizzle, Firebase Auth & Storage and shared domain rules used by the frontend and backend.', 'Architecture applicative : Node.js, Express, TypeScript, PostgreSQL, Drizzle, Firebase Auth et Storage, et des règles métier partagées entre le front-end et le back-end.'],
  ['Security & reliability: Case-level access control, runtime validation, MFA flows, file validation, antivirus scanning, monitoring and automated tests.', 'Sécurité et fiabilité : contrôle d’accès au niveau du dossier, validation à l’exécution, parcours MFA, validation des fichiers, analyse antivirus, supervision et tests automatisés.'],
  ['Business workflows: Structured states, scheduling rules, real-time updates and generated documents support case files as they progress over time.', 'Flux métier : états structurés, règles de planification, mises à jour en temps réel et documents générés accompagnent les dossiers au fil de leur avancement.'],
  ['Working together', 'Travailler ensemble'],
  ['I did not know my client’s profession. I had to learn its concepts, its vocabulary and the way its professionals really work, and I found it fascinating: diving into a new world is one of the things I enjoy most about my job.', 'Je ne connaissais pas le métier de mon client. J’ai dû en apprendre les concepts, le vocabulaire et la façon dont ses professionnels travaillent vraiment, et je l’ai trouvé passionnant : plonger dans un nouveau monde est l’une des choses que j’aime le plus dans mon travail.'],
  ['I am convinced that observing and understanding come before designing. Interfaces and business workflows only bring real value when they rest on a genuine grasp of the field, so I ask questions, listen and keep learning until the logic of the work is clear to me.', 'Je suis convaincue qu’observer et comprendre viennent avant de concevoir. Des interfaces et des flux métier n’apportent une vraie valeur que s’ils reposent sur une compréhension réelle du terrain : je pose des questions, j’écoute et j’apprends jusqu’à ce que la logique du travail me soit claire.'],
  ['I explain my technical choices in plain words, write decisions down, and leave a project documented (set-up, deployment, maintenance) so a team can pick it up without me.', 'J’explique mes choix techniques avec des mots simples, je consigne les décisions et je laisse un projet documenté (installation, déploiement, maintenance) pour qu’une équipe puisse le reprendre sans moi.'],
  ['If you are building a platform for a field with its own rules, several kinds of users or a lot of invisible complexity, I would love to hear about it.', 'Si vous construisez une plateforme pour un domaine qui a ses propres règles, plusieurs types d’utilisateurs ou beaucoup de complexité invisible, j’aimerais en entendre parler.'],
];

const main = async () => {
  const ids = await client.fetch<string[]>(`*[_type == "project" && slug.current == $slug && language == "fr"]._id`, { slug: SLUG });
  if (!ids.length) throw new Error(`Projet introuvable : ${SLUG}`);
  const pageTexts = FR.map(([en, fr]) => ({ _type: 'object', _key: keyOf(en), text: fr }));
  console.log(`${ids.length} document(s), ${pageTexts.length} textes`);
  if (dry) return;
  for (const id of ids) await client.patch(id).set({ pageTexts, title: 'Plateforme professionnelle multi-rôles' }).commit();
  console.log('✓ pageTexts mis à jour');
};
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

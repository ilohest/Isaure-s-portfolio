import { useEffect, useState } from 'react';
import { Card, Stack, Text } from '@sanity/ui';
import { useClient, useFormValue } from 'sanity';
import { IntentLink } from 'sanity/router';
import { baseLanguage } from '../lib/i18n';

type Row = { _id: string; title?: string };

/** Liste (lecture seule) des projets qui référencent le secteur / service / technologie ouvert. Rien n’est enregistré. */
export const UsedInInput = () => {
  const client = useClient({ apiVersion: '2025-01-01' });
  const rawId = useFormValue(['_id']) as string | undefined;
  const id = rawId?.replace(/^drafts\./, '');
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    if (!id) return;
    let live = true;
    client
      .fetch<Row[]>(
        `*[_type == "project" && language == $lang && !(_id in path("drafts.**")) && references($id)] | order(title asc){ _id, title }`,
        { id, lang: baseLanguage },
      )
      .then((r) => live && setRows(r));
    return () => {
      live = false;
    };
  }, [client, id]);

  return (
    <Card padding={3} border radius={2} tone="transparent">
      <Stack space={3}>
        {!rows && <Text muted size={1}>Chargement…</Text>}
        {rows?.length === 0 && <Text muted size={1}>Aucun projet ne l’utilise.</Text>}
        {rows?.map((r) => (
          <Text key={r._id} size={1}>
            <IntentLink intent="edit" params={{ id: r._id, type: 'project' }}>
              {r.title ?? r._id}
            </IntentLink>
          </Text>
        ))}
      </Stack>
    </Card>
  );
};

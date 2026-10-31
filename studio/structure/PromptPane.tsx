import { useEffect, useState } from 'react';
import { Box, Button, Card, Flex, Stack, Text } from '@sanity/ui';
import { CheckmarkIcon, CopyIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import prompt from '../documentation/prompt-projet.md?raw';

type Named = { title?: string; titleEn?: string };

/**
 * Documentation : le prompt à donner à l'IA qui rédige un projet. Les listes de secteurs, services et
 * technologies sont lues en direct dans le Studio pour que l'IA réutilise les noms existants.
 */
export function PromptPane() {
  const client = useClient({ apiVersion: '2025-01-01' });
  const [lists, setLists] = useState<{ sectors: Named[]; services: Named[]; techs: Named[] } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    client
      .fetch('{ "sectors": *[_type == "sector"] | order(title) {title, titleEn}, "services": *[_type == "service"] | order(titleEn) {title, titleEn}, "techs": *[_type == "technology"] | order(title) {title} }')
      .then(setLists)
      .catch(() => setLists({ sectors: [], services: [], techs: [] }));
  }, [client]);

  const bilingual = (x: Named) => (x.titleEn && x.titleEn !== x.title ? `${x.title} / ${x.titleEn}` : (x.title ?? x.titleEn ?? ''));
  const text = lists
    ? prompt
        .replace('{{SECTEURS}}', lists.sectors.map(bilingual).join(' · '))
        .replace('{{SERVICES}}', lists.services.map((x) => x.titleEn ?? x.title).join(' · '))
        .replace('{{TECHNOLOGIES}}', lists.techs.map((x) => x.title).join(', '))
    : '';

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box padding={4} style={{ maxWidth: 900 }}>
      <Stack space={4}>
        <Text size={1} muted>
          À donner à l’IA avec laquelle tu travailles sur un projet, suivi du brief. Elle rend un fichier projet.json que Claude encode ensuite dans Sanity (skill « encode-project »). Le projet est créé non publié.
        </Text>
        <Flex>
          <Button icon={copied ? CheckmarkIcon : CopyIcon} tone={copied ? 'positive' : 'primary'} text={copied ? 'Copié' : 'Copier le prompt'} onClick={copy} disabled={!text} />
        </Flex>
        <Card padding={4} radius={2} border>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', fontSize: 14, lineHeight: 1.55 }}>{text || 'Chargement…'}</pre>
        </Card>
      </Stack>
    </Box>
  );
}

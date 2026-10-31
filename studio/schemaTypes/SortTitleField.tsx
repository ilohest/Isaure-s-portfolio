import { useEffect } from 'react';
import { set, unset, useFormValue, type FieldProps } from 'sanity';

/** Clé de tri : le nom sans accents ni apostrophes, en minuscules (le tri de Sanity ignore l’alphabet français). */
export const sortKey = (title?: string) =>
  (title ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .toLowerCase()
    .trim();

/** Champ invisible, tenu à jour tout seul à partir du nom : sert uniquement à trier les listes du Studio. */
export const SortTitleField = (props: FieldProps) => {
  const title = useFormValue(['title']) as string | undefined;
  const { value, onChange } = props.inputProps as { value?: string; onChange: (p: unknown) => void };
  const next = sortKey(title);

  useEffect(() => {
    if (next === (value ?? '')) return;
    onChange(next ? set(next) : unset());
  }, [next, value, onChange]);

  return null;
};

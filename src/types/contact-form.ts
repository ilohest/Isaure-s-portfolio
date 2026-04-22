import type { FieldValue } from 'firebase/firestore';

export type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export interface ContactFormState {
  name: string;
  email: string;
  additionalInfo: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  additionalInfo: string;
  source: string;
  createdAt: FieldValue;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);

export const createInitialFormData = (): ContactFormState => ({
  name: '',
  email: '',
  additionalInfo: '',
});

export const buildContactMessagePayload = (
  formData: ContactFormState,
  createdAt: FieldValue,
  source: string,
): ContactMessagePayload => ({
  name: formData.name,
  email: formData.email,
  additionalInfo: formData.additionalInfo,
  source,
  createdAt,
});

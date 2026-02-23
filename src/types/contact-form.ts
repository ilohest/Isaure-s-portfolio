import type { FieldValue } from 'firebase/firestore';

export type ContactMethod = 'email' | 'phone';
export type ProjectType = 'website' | 'site redesign' | 'maintenance' | 'other';
export type NumberOfPages = '1' | '1-5' | '6-10' | '11+';
export type Feature =
  | 'e-commerce'
  | 'user registration/login'
  | 'multilingual'
  | 'contact form'
  | 'blog'
  | 'portfolio'
  | 'social media integration'
  | 'photo/video gallery'
  | 'other';
export type VisualIdentity = '' | 'yes' | 'no';
export type Deadline = 'urgent' | 'short-term' | 'flexible';
export type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export interface SelectOption<TValue extends string> {
  label: string;
  value: TValue;
}

export interface ContactFormState {
  name: string;
  email: string;
  phoneNumber: string;
  contactMethod: ContactMethod;
  projectType: ProjectType;
  projectTypeOther: string;
  numberOfPages: NumberOfPages;
  features: Feature[];
  featuresOther: string;
  visualIdentity: VisualIdentity;
  deadline: Deadline;
  additionalInfo: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  phoneNumber: string | null;
  contactMethod: ContactMethod;
  projectType: string;
  numberOfPages: NumberOfPages;
  features: Feature[];
  featuresOther: string | null;
  visualIdentity: VisualIdentity;
  deadline: Deadline;
  additionalInfo: string;
  createdAt: FieldValue;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);

export const createInitialFormData = (): ContactFormState => ({
  name: '',
  email: '',
  phoneNumber: '',
  contactMethod: 'email',
  projectType: 'website',
  projectTypeOther: '',
  numberOfPages: '1',
  features: [],
  featuresOther: '',
  visualIdentity: '',
  deadline: 'flexible',
  additionalInfo: '',
});

export const buildContactMessagePayload = (
  formData: ContactFormState,
  createdAt: FieldValue,
): ContactMessagePayload => ({
  name: formData.name,
  email: formData.email,
  phoneNumber: formData.phoneNumber || null,
  contactMethod: formData.contactMethod,
  projectType: formData.projectType === 'other' ? formData.projectTypeOther || 'other' : formData.projectType,
  numberOfPages: formData.numberOfPages,
  features: formData.features,
  featuresOther: formData.featuresOther || null,
  visualIdentity: formData.visualIdentity,
  deadline: formData.deadline,
  additionalInfo: formData.additionalInfo,
  createdAt,
});

export const contactMethodOptions: SelectOption<ContactMethod>[] = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
];

export const projectTypeOptions: SelectOption<ProjectType>[] = [
  { label: 'New Website', value: 'website' },
  { label: 'Site Redesign', value: 'site redesign' },
  { label: 'Site Maintenance', value: 'maintenance' },
  { label: 'Other', value: 'other' },
];

export const pagesOptions: SelectOption<NumberOfPages>[] = [
  { label: '1 page', value: '1' },
  { label: '2-5 pages', value: '1-5' },
  { label: '6-10 pages', value: '6-10' },
  { label: '11+ pages', value: '11+' },
];

export const featuresOptions: SelectOption<Feature>[] = [
  { label: 'E-commerce', value: 'e-commerce' },
  { label: 'User Registration/Login', value: 'user registration/login' },
  { label: 'Multilingual', value: 'multilingual' },
  { label: 'Contact Form', value: 'contact form' },
  { label: 'Blog', value: 'blog' },
  { label: 'Portfolio', value: 'portfolio' },
  { label: 'Social Media Integration', value: 'social media integration' },
  { label: 'Photo/Video Gallery', value: 'photo/video gallery' },
  { label: 'Other', value: 'other' },
];

export const visualIdentityOptions: SelectOption<Exclude<VisualIdentity, ''>>[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const deadlineOptions: SelectOption<Deadline>[] = [
  { label: 'Urgent (less than 1 month)', value: 'urgent' },
  { label: 'Short term (1-3 months)', value: 'short-term' },
  { label: 'Flexible', value: 'flexible' },
];

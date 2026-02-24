declare module 'vue3-tel-input' {
  import type { DefineComponent, Plugin } from 'vue';

  const VueTelInput: Plugin &
    DefineComponent<{
      modelValue?: string;
      mode?: 'international' | 'national' | 'auto';
      placeholder?: string;
    }>;

  export default VueTelInput;
}

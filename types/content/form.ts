/**
 * Each field in the form is described here:
 *   name: the key used in the JSON body
 *   label: what the user sees above the input
 *   type: HTML input type (text, number, email, etc.)
 *   placeholder: optional placeholder text
 */
export type FormField = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
};

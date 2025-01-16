/**
 * Each field in the form is described here:
 *   name: the key used in the JSON body
 *   label: what the user sees above the input
 *   type: HTML input type (text, number, email, etc.)
 *   placeholder: optional placeholder text
 */
export type FormField = {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  pattern?: string;
};

/**
 * Base type for fields with text-based input
 */
export type FormFieldText = FormField & {
  type: "text";
  autocomplete?: string;
  minLength?: number;
  maxLength?: number;
};

/**
 * Base type for fields with numerical constraints
 */
export type FormFieldNumerical = FormField & {
  min?: number | string;
  max?: number | string;
  step?: number;
};

export type FormFieldSelect = Omit<FormField, "type"> & {
  type: "select";
  options: string[];
};

export type FormFieldCheckbox = Omit<FormField, "type"> & {
  type: "checkbox";
  checked: boolean;
};

export type FormFieldPassword = Omit<FormFieldText, "type"> & {
  type: "password";
};

export type FormFieldEmail = Omit<FormFieldText, "type"> & {
  type: "email";
  multiple?: boolean;
};

export type FormFieldSearch = Omit<FormFieldText, "type"> & {
  type: "search";
};

export type FormFieldColor = Omit<FormField, "type"> & {
  type: "color";
};

export type FormFieldRange = Omit<FormFieldNumerical, "type"> & {
  type: "range";
};

export type FormFieldDateTime = Omit<FormFieldNumerical, "type"> & {
  type: "datetime-local";
};

export type FormFieldNumber = Omit<FormFieldNumerical, "type"> & {
  type: "number";
};

export type FormFieldDate = Omit<FormFieldNumerical, "type"> & {
  type: "date";
};

// Added missing FormFieldTel and FormFieldUrl types that should extend FormFieldText
export type FormFieldTel = Omit<FormFieldText, "type"> & {
  type: "tel";
};

export type FormFieldUrl = Omit<FormFieldText, "type"> & {
  type: "url";
};

export type FormFields =
  | FormFieldSelect
  | FormFieldCheckbox
  | FormFieldNumber
  | FormFieldDate
  | FormFieldText
  | FormFieldPassword
  | FormFieldEmail
  | FormFieldSearch
  | FormFieldColor
  | FormFieldRange
  | FormFieldDateTime
  | FormFieldTel // Added to union type
  | FormFieldUrl; // Added to union type

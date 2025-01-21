import { HttpMethodType } from "@/types/constant/form";
import { formConfigurations } from "./formConfigurations";

interface FormField {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export const FormContent = ({
  activeForm,
  setServerResponse,
}: {
  activeForm: HttpMethodType;
  setServerResponse: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const formConfig = formConfigurations[activeForm];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formConfig.handleSubmit(setServerResponse);
      }}
      className="flex flex-col gap-2 mb-4"
    >
      {formConfig.fields.map((field: FormField) => (
        <div key={field.name}>
          <label className="text-sm">{field.label}</label>
          <input
            name={field.name}
            className="text-black px-2 py-1 rounded"
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      ))}
      <button type="submit" className={formConfig.buttonClass}>
        {formConfig.buttonText}
      </button>
    </form>
  );
};

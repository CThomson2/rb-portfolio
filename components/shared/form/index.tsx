import { CustomForm } from "./CustomForm";
import type { CustomFormProps } from "./CustomForm";
import { FormDetails } from "./FormDetails";

export const Form = ({
  title,
  endpoint,
  method,
  fields,
  initialValues,
  onSuccess,
  onError,
  className,
}: CustomFormProps) => {
  return (
    <div className="flex min-h-screen bg-slate-800">
      {/* Form Section */}
      <div className="w-3/5 p-8 bg-slate-700">
        <CustomForm
          title={title}
          endpoint={endpoint}
          method={method}
          fields={fields}
          initialValues={initialValues}
          onSuccess={onSuccess}
          onError={onError}
          className={className}
        />
      </div>
      {/* Details Section */}
      <div className="w-2/5 p-8 bg-slate-600">
        <FormDetails />
      </div>
    </div>
  );
};

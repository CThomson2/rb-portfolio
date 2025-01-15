import { Form } from "@/components/shared/form";

export const CreateOrderForm = () => {
  return (
    <Form
      endpoint="/api/inventory/orders"
      method="POST"
      fields={[
        {
          label: "Material",
          name: "material",
          type: "text",
        },
      ]}
    />
  );
};

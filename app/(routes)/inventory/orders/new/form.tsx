import { Form } from "@/components/shared/form";

export const CreateOrderForm = () => {
  return (
    <Form
      title="Create Order"
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

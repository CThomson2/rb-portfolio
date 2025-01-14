"use client";
import React from "react";
import { Form } from "@/components/shared/form";
import type { FormField } from "@/types/content/form";

const fields: FormField[] = [
  // TODO: Convert the transaction Type input to a dropdown, not text input
  {
    name: "type",
    label: "Type",
    type: "text",
    placeholder: "Import | Processing | Reprocessing | Disposal | Loss",
    required: true,
  },
  // TODO: Convert the date input to a date picker; default to today's date
  {
    name: "date",
    label: "Date",
    type: "date",
    required: true,
  },
  {
    name: "grade",
    label: "Grade",
    type: "text",
    placeholder: "GD | HPLC | LCMS | PTS",
    required: true,
  },
  { name: "sku", label: "SKU", type: "text", placeholder: "Enter SKU" },
];

const NewTransactionPage = () => {
  // If I want to do a GET on mount (to pre-fill the form), I can do so here
  // This would then set `initialValues` in state, and pass to <CustomForm initialValues={...} />

  return (
    <div className="p-6">
      <Form
        endpoint="/api/inventory/transactions/new"
        method="POST"
        fields={fields}
        onSuccess={(data) => {
          console.log("Transaction created successfully", data);
          // TODO: Run API call to run prisma createTransaction
          alert("Transaction created");
        }}
      />
    </div>
  );
};

export default NewTransactionPage;

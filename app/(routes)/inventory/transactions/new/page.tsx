"use client";
import React, { useState } from "react";
import { Form } from "@/components/shared/form";
import type { FormFields } from "@/types/content/form";
import { TransactionSource } from "@/types/constant/inventory/transactions";

const NewTransactionPage = () => {
  const [source, setSource] = useState<
    (typeof TransactionSource)[keyof typeof TransactionSource]
  >(TransactionSource.DELIVERY);
  // If I want to do a GET on mount (to pre-fill the form), I can do so here
  // This would then set `initialValues` in state, and pass to <CustomForm initialValues={...} />
  const fields: FormFields[] = [
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
      name: `${source}_id`,
      label: `${source} ID:`,
      type: "select",
      options: Object.values(TransactionSource),
      required: true,
    },
    // Conditionally render below fields when source is "process" or "reprocess" - not on "delivery"
    // TODO: Conditionally render based on source
    // TODO: Find the process_id from the still code, given the date of the transaction
    // TODO: Display the name of the material, being processed in the still selected, showing the user that they're selecting the correct still as the app returned the expected material name
    // TODO: If the user selects a still that doesn't exist, show an error message
    {
      name: "still_code",
      label: "still_code",
      type: "select",
      options: Object.values(TransactionSource),
      placeholder: "Enter Process ID",
      required: false,
    },
  ];

  return (
    <div className="p-6">
      <Form
        title="Create Transaction"
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

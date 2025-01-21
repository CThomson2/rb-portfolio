import { TransactionsTable } from "@/components/features/inventory/TransactionsTable/index";

/*
This client component will display the inventory transactions table,
taking data from the database and displaying it with live updates.
There will also be the ability to manage inventory transactions.
This means adding records to the table - not modifying or deleting existing records.
Adding a record involves an input form, which will confirm that all required fields are filled out, and will utilise type safety to ensure that the data is valid with the database constraints.
*/
const TransactionsPage = () => {
  return <TransactionsTable />;
};

export default TransactionsPage;

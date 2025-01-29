"use client";

import { InitialInfo } from "./initialInfo";
/* Yet to be implemented */
// import { OrderInfo } from "./orderInfo";
// import { FinalInfo } from "./finalInfo";

/* ## Page 1: Basic Information ##

Purpose: Capture the initial job details—mirroring the top of your paper form.

Fields could include:

Production Record ID: auto-generated or manually assigned.
Material: e.g. "Methanol," "Acetonitrile," etc. Possibly a dropdown from your DB.
Order ID: This references the order from which the drums came. If needed, a user can confirm or select which order.
Drum(s) #: Possibly a list or array of drum IDs. A "Scan Drums" button can open a small scanning modal that automatically populates which drums have been assigned to this production run.
Date: The date the process starts.
Operators / "Loader" or "Transport" fields: If your form requires an operator name, loader name, or second check, you can show "Operator 1," "Operator 2," or "Transport" fields. They either type their name or select from a user list.
UI Suggestions: • Provide a multi-drum input if scanning multiple drums at once. • Optionally show "Scanned Drums" in a table on this page.
*/

export function QrdForm() {
  return <InitialInfo onSubmit={() => {}} />;
}

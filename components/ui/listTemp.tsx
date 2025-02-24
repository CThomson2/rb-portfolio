import React from "react";

export const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-5">{children}</ul>
);

export const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="mb-2">{children}</li>
);

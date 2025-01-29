// Changed from enum to const map for better type safety and consistency
export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

// Type for FormTypes values
export type HttpMethodType = (typeof HttpMethod)[keyof typeof HttpMethod];

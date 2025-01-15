// Changed from enum to const map for drum status
export const DrumStatus = {
  PENDING: "pending",
  AVAILABLE: "available",
  SCHEDULED: "scheduled",
  PROCESSED: "processed",
} as const;

// Type for DrumStatus values
export type DrumStatusType = (typeof DrumStatus)[keyof typeof DrumStatus];

// Changed from enum to const map for locations
export const DrumLocation = {
  NEW_SITE: "new-site",
  OLD_SITE: "old-site",
} as const;

// Type for DrumLocation values
export type DrumLocationType = (typeof DrumLocation)[keyof typeof DrumLocation];

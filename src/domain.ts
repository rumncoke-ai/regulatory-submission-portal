export const submissionStatuses = [
  "Draft",
  "Submitted",
  "Under Review",
  "Additional Information Required",
  "Approved",
  "Closed",
] as const;

export type SubmissionStatus = (typeof submissionStatuses)[number];

export const submissionTypes = [
  "Product registration",
  "Facility licence",
  "Import authorization",
  "Label review",
  "Other regulatory request",
] as const;

export type SubmissionType = (typeof submissionTypes)[number];

export interface AttachmentMetadata {
  id: string;
  fileName: string;
  sizeBytes: number;
  mediaType: string;
}

export interface Submission {
  id: string;
  referenceNumber: string;
  organizationName: string;
  address: string;
  city: string;
  province: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  submissionType: SubmissionType;
  description: string;
  attachments: AttachmentMetadata[];
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

export type SubmissionFormValues = Omit<
  Submission,
  | "id"
  | "referenceNumber"
  | "status"
  | "createdAt"
  | "updatedAt"
  | "submittedAt"
>;

export const statusDescriptions: Record<SubmissionStatus, string> = {
  Draft: "This submission has been saved but not submitted.",
  Submitted: "The submission has been received for processing.",
  "Under Review": "The review team is assessing the submission.",
  "Additional Information Required":
    "More information would be needed before review could continue.",
  Approved: "The review has been completed successfully.",
  Closed: "Processing of this submission is complete.",
};

import { z } from "zod";
import rawSampleSubmissions from "../sample-data/submissions.json";
import { submissionStatuses, submissionTypes } from "./domain";

const sampleSubmissionSchema = z.object({
  id: z.string(),
  referenceNumber: z.string(),
  organizationName: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  contactFirstName: z.string(),
  contactLastName: z.string(),
  contactEmail: z.string(),
  contactPhone: z.string(),
  submissionType: z.enum(submissionTypes),
  description: z.string(),
  attachments: z.array(
    z.object({
      id: z.string(),
      fileName: z.string(),
      sizeBytes: z.number(),
      mediaType: z.string(),
    }),
  ),
  status: z.enum(submissionStatuses),
  createdAt: z.string(),
  updatedAt: z.string(),
  submittedAt: z.string().optional(),
});

export const sampleSubmissions = z
  .array(sampleSubmissionSchema)
  .parse(rawSampleSubmissions);

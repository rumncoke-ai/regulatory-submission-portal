import type {
  Submission,
  SubmissionFormValues,
  SubmissionStatus,
} from "./domain";
import { sampleSubmissions } from "./sampleData";

const STORAGE_KEY = "regulatory-submission-portal.submissions.v3";

export interface SubmissionRepository {
  list(): Submission[];
  get(id: string): Submission | undefined;
  create(values: SubmissionFormValues, status: SubmissionStatus): Submission;
}

export class LocalStorageSubmissionRepository
  implements SubmissionRepository
{
  list(): Submission[] {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      this.write(sampleSubmissions);
      return structuredClone(sampleSubmissions);
    }

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      throw new Error("Saved submission data is not in the expected format.");
    }
    return parsed as Submission[];
  }

  get(id: string): Submission | undefined {
    return this.list().find((submission) => submission.id === id);
  }

  create(
    values: SubmissionFormValues,
    status: SubmissionStatus,
  ): Submission {
    const submissions = this.list();
    const now = new Date().toISOString();
    const submission: Submission = {
      ...values,
      id: crypto.randomUUID(),
      referenceNumber: this.nextReference(submissions),
      status,
      createdAt: now,
      updatedAt: now,
      submittedAt: status === "Submitted" ? now : undefined,
    };

    this.write([submission, ...submissions]);
    return submission;
  }

  private nextReference(submissions: Submission[]): string {
    const year = new Date().getFullYear();
    const highestNumber = submissions.reduce((highest, submission) => {
      const match = submission.referenceNumber.match(/(\d{4})$/);
      return Math.max(highest, match ? Number(match[1]) : 0);
    }, 0);
    return `RSP-${year}-${String(highestNumber + 1).padStart(4, "0")}`;
  }

  private write(submissions: Submission[]): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }
}

export const submissionRepository = new LocalStorageSubmissionRepository();
export { STORAGE_KEY };

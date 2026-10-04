import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SubmissionFormValues } from "./domain";
import {
  LocalStorageSubmissionRepository,
  STORAGE_KEY,
} from "./repository";

const formValues: SubmissionFormValues = {
  organizationName: "Fictional Test Organization",
  address: "1 Test Street",
  city: "Ottawa",
  province: "ON",
  contactFirstName: "Alex",
  contactLastName: "Example",
  contactEmail: "alex@example.test",
  contactPhone: "",
  submissionType: "Label review",
  description: "A fictional test submission.",
  attachments: [],
};

describe("LocalStorageSubmissionRepository", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(crypto, "randomUUID").mockReturnValue(
      "00000000-0000-4000-8000-000000000001",
    );
  });

  it("seeds fictional submissions when storage is empty", () => {
    const repository = new LocalStorageSubmissionRepository();

    const submissions = repository.list();

    expect(submissions).toHaveLength(6);
    expect(submissions[0].referenceNumber).toBe("RSP-2026-0001");
    expect(new Set(submissions.map((submission) => submission.status))).toEqual(
      new Set([
        "Draft",
        "Submitted",
        "Under Review",
        "Additional Information Required",
        "Approved",
        "Closed",
      ]),
    );
    expect(window.localStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });

  it("creates and retrieves a submitted application", () => {
    const repository = new LocalStorageSubmissionRepository();

    const created = repository.create(formValues, "Submitted");

    expect(created.id).toBe("00000000-0000-4000-8000-000000000001");
    expect(created.referenceNumber).toMatch(/^RSP-\d{4}-0007$/);
    expect(created.status).toBe("Submitted");
    expect(created.submittedAt).toBeDefined();
    expect(repository.get(created.id)).toEqual(created);
  });

  it("surfaces malformed saved data", () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ invalid: true }));
    const repository = new LocalStorageSubmissionRepository();

    expect(() => repository.list()).toThrow(
      "Saved submission data is not in the expected format.",
    );
  });
});

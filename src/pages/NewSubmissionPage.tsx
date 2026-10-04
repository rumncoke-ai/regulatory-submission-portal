import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  submissionTypes,
  type AttachmentMetadata,
  type SubmissionFormValues,
} from "../domain";
import { submissionRepository } from "../repository";

const provinces = [
  ["AB", "Alberta"],
  ["BC", "British Columbia"],
  ["MB", "Manitoba"],
  ["NB", "New Brunswick"],
  ["NL", "Newfoundland and Labrador"],
  ["NS", "Nova Scotia"],
  ["NT", "Northwest Territories"],
  ["NU", "Nunavut"],
  ["ON", "Ontario"],
  ["PE", "Prince Edward Island"],
  ["QC", "Quebec"],
  ["SK", "Saskatchewan"],
  ["YT", "Yukon"],
];

const defaultValues: SubmissionFormValues = {
  organizationName: "",
  address: "",
  city: "",
  province: "",
  contactFirstName: "",
  contactLastName: "",
  contactEmail: "",
  contactPhone: "",
  submissionType: "Product registration",
  description: "",
  attachments: [],
};

export default function NewSubmissionPage() {
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState<AttachmentMetadata[]>([]);
  const [saveError, setSaveError] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SubmissionFormValues>({ defaultValues });

  useEffect(() => {
    document.title = "New submission | Regulatory Submission Portal";
  }, []);

  function persist(values: SubmissionFormValues, asDraft: boolean) {
    setSaveError("");
    try {
      const submission = submissionRepository.create(
        { ...values, attachments },
        asDraft ? "Draft" : "Submitted",
      );
      navigate(`/submissions/${submission.id}`, {
        state: { created: true, asDraft },
      });
    } catch {
      setSaveError(
        "The submission could not be saved in this browser. Please try again.",
      );
    }
  }

  function saveDraft() {
    const values = getValues();
    if (!values.organizationName.trim()) {
      setError("organizationName", {
        message: "Enter an organization name before saving a draft.",
      });
      document.getElementById("organizationName")?.focus();
      return;
    }
    persist(values, true);
  }

  function addFiles(files: FileList | null) {
    if (!files) return;
    setAttachments((current) => [
      ...current,
      ...Array.from(files, (file) => ({
        id: crypto.randomUUID(),
        fileName: file.name,
        sizeBytes: file.size,
        mediaType: file.type || "Unknown",
      })),
    ]);
  }

  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">New regulatory submission</p>
        <h1>Create a submission</h1>
        <p>
          Fields marked <span aria-hidden="true">*</span>
          <span className="visually-hidden">with an asterisk</span> are required
          to submit.
        </p>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="alert alert-error" role="alert">
          <strong>Review the highlighted fields.</strong>
          <span>Some required information is missing or invalid.</span>
        </div>
      )}
      {saveError && (
        <div className="alert alert-error" role="alert">
          {saveError}
        </div>
      )}

      <form
        className="submission-form"
        onSubmit={handleSubmit((values) => persist(values, false))}
        noValidate
      >
        <fieldset>
          <legend>Organization information</legend>
          <div className="form-grid">
            <div className="field field-wide">
              <label htmlFor="organizationName">
                Legal organization name <span aria-hidden="true">*</span>
              </label>
              <input
                id="organizationName"
                aria-invalid={Boolean(errors.organizationName)}
                aria-describedby={
                  errors.organizationName ? "organizationName-error" : undefined
                }
                {...register("organizationName", {
                  required: "Enter the legal organization name.",
                })}
              />
              {errors.organizationName && (
                <span className="field-error" id="organizationName-error">
                  {errors.organizationName.message}
                </span>
              )}
            </div>
            <div className="field field-wide">
              <label htmlFor="address">
                Street address <span aria-hidden="true">*</span>
              </label>
              <input
                id="address"
                aria-invalid={Boolean(errors.address)}
                {...register("address", { required: "Enter a street address." })}
              />
              {errors.address && (
                <span className="field-error">{errors.address.message}</span>
              )}
            </div>
            <div className="field">
              <label htmlFor="city">
                City <span aria-hidden="true">*</span>
              </label>
              <input
                id="city"
                aria-invalid={Boolean(errors.city)}
                {...register("city", { required: "Enter a city." })}
              />
              {errors.city && (
                <span className="field-error">{errors.city.message}</span>
              )}
            </div>
            <div className="field">
              <label htmlFor="province">
                Province or territory <span aria-hidden="true">*</span>
              </label>
              <select
                id="province"
                aria-invalid={Boolean(errors.province)}
                {...register("province", {
                  required: "Select a province or territory.",
                })}
              >
                <option value="">Select one</option>
                {provinces.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              {errors.province && (
                <span className="field-error">{errors.province.message}</span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Primary contact</legend>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="contactFirstName">
                First name <span aria-hidden="true">*</span>
              </label>
              <input
                id="contactFirstName"
                aria-invalid={Boolean(errors.contactFirstName)}
                {...register("contactFirstName", {
                  required: "Enter a first name.",
                })}
              />
              {errors.contactFirstName && (
                <span className="field-error">
                  {errors.contactFirstName.message}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="contactLastName">
                Last name <span aria-hidden="true">*</span>
              </label>
              <input
                id="contactLastName"
                aria-invalid={Boolean(errors.contactLastName)}
                {...register("contactLastName", {
                  required: "Enter a last name.",
                })}
              />
              {errors.contactLastName && (
                <span className="field-error">
                  {errors.contactLastName.message}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="contactEmail">
                Email address <span aria-hidden="true">*</span>
              </label>
              <input
                id="contactEmail"
                type="email"
                aria-invalid={Boolean(errors.contactEmail)}
                {...register("contactEmail", {
                  required: "Enter an email address.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter an email address in a valid format.",
                  },
                })}
              />
              {errors.contactEmail && (
                <span className="field-error">
                  {errors.contactEmail.message}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="contactPhone">Phone number</label>
              <input id="contactPhone" type="tel" {...register("contactPhone")} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Submission details</legend>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="submissionType">
                Submission type <span aria-hidden="true">*</span>
              </label>
              <select id="submissionType" {...register("submissionType")}>
                {submissionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="field field-wide">
              <label htmlFor="description">
                Description <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="description"
                rows={6}
                aria-invalid={Boolean(errors.description)}
                {...register("description", {
                  required: "Enter a submission description.",
                })}
              />
              {errors.description && (
                <span className="field-error">{errors.description.message}</span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Supporting documents</legend>
          <p className="hint" id="documents-help">
            The portal stores file names and sizes in this browser. File
            contents are not retained.
          </p>
          <div className="field">
            <label htmlFor="documents">Choose files</label>
            <input
              id="documents"
              type="file"
              multiple
              aria-describedby="documents-help"
              onChange={(event) => addFiles(event.target.files)}
            />
          </div>
          {attachments.length > 0 && (
            <ul className="attachment-list" aria-label="Selected documents">
              {attachments.map((attachment) => (
                <li key={attachment.id}>
                  <span>
                    {attachment.fileName} (
                    {Math.max(1, Math.round(attachment.sizeBytes / 1024))} KB)
                  </span>
                  <button
                    className="button-link"
                    type="button"
                    onClick={() =>
                      setAttachments((current) =>
                        current.filter((item) => item.id !== attachment.id),
                      )
                    }
                    aria-label={`Remove ${attachment.fileName}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        <div className="form-actions">
          <button className="button" type="submit" disabled={isSubmitting}>
            Submit application
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={saveDraft}
          >
            Save draft
          </button>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </>
  );
}

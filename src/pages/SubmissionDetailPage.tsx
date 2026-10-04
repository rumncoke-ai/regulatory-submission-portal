import { useEffect, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { statusDescriptions, type Submission } from "../domain";
import { submissionRepository } from "../repository";

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "long",
  timeStyle: "short",
});

export default function SubmissionDetailPage() {
  const { id = "" } = useParams();
  const location = useLocation();
  const { submission, loadError } = useMemo(() => loadSubmission(id), [id]);

  useEffect(() => {
    document.title = submission
      ? `${submission.referenceNumber} | Regulatory Submission Portal`
      : "Submission not found | Regulatory Submission Portal";
  }, [submission]);

  if (loadError) {
    return (
      <div className="alert alert-error" role="alert">
        The saved submission could not be loaded.
      </div>
    );
  }

  function loadSubmission(id: string): {
    submission: Submission | undefined;
    loadError: boolean;
  } {
    try {
      return { submission: submissionRepository.get(id), loadError: false };
    } catch {
      return { submission: undefined, loadError: true };
    }
  }

  if (!submission) {
    return (
      <div className="empty-state">
        <h1>Submission not found</h1>
        <p>The requested submission does not exist.</p>
        <Link className="button" to="/">
          Return to submissions
        </Link>
      </div>
    );
  }

  const createdState = location.state as
    | { created?: boolean; asDraft?: boolean }
    | undefined;

  return (
    <>
      {createdState?.created && (
        <div className="alert alert-success" role="status">
          <strong>
            {createdState.asDraft ? "Draft saved." : "Submission received."}
          </strong>
          <span>
            Your reference number is {submission.referenceNumber}.
          </span>
        </div>
      )}
      <div className="page-heading">
        <p className="eyebrow">Submission details</p>
        <h1>{submission.referenceNumber}</h1>
        <div className="status-heading">
          <StatusBadge status={submission.status} />
          <span>{statusDescriptions[submission.status]}</span>
        </div>
      </div>

      <div className="detail-grid">
        <section className="detail-card" aria-labelledby="overview-heading">
          <h2 id="overview-heading">Overview</h2>
          <dl>
            <div>
              <dt>Organization</dt>
              <dd>{submission.organizationName}</dd>
            </div>
            <div>
              <dt>Submission type</dt>
              <dd>{submission.submissionType}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{dateFormatter.format(new Date(submission.createdAt))}</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>{dateFormatter.format(new Date(submission.updatedAt))}</dd>
            </div>
          </dl>
        </section>

        <section className="detail-card" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Organization and contact</h2>
          <address>
            <strong>{submission.organizationName}</strong>
            <br />
            {submission.address && (
              <>
                {submission.address}
                <br />
                {submission.city}, {submission.province}
                <br />
              </>
            )}
          </address>
          <p>
            {submission.contactFirstName} {submission.contactLastName}
            <br />
            <a href={`mailto:${submission.contactEmail}`}>
              {submission.contactEmail}
            </a>
            {submission.contactPhone && (
              <>
                <br />
                {submission.contactPhone}
              </>
            )}
          </p>
        </section>

        <section
          className="detail-card detail-card-wide"
          aria-labelledby="description-heading"
        >
          <h2 id="description-heading">Description</h2>
          <p>{submission.description || "No description has been provided."}</p>
        </section>

        <section
          className="detail-card detail-card-wide"
          aria-labelledby="documents-heading"
        >
          <h2 id="documents-heading">Supporting documents</h2>
          {submission.attachments.length > 0 ? (
            <ul>
              {submission.attachments.map((attachment) => (
                <li key={attachment.id}>
                  {attachment.fileName} (
                  {Math.max(1, Math.round(attachment.sizeBytes / 1024))} KB)
                </li>
              ))}
            </ul>
          ) : (
            <p>No supporting documents were added.</p>
          )}
          <p className="hint">
            File contents are not retained by this portal.
          </p>
        </section>
      </div>

      <p>
        <Link to="/">&larr; Back to all submissions</Link>
      </p>
    </>
  );
}

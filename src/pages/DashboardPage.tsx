import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubmissionList from "../components/SubmissionList";
import type { Submission } from "../domain";
import { submissionRepository } from "../repository";

export default function DashboardPage() {
  const [{ submissions, error }] = useState(loadSubmissions);

  useEffect(() => {
    document.title = "Your submissions | Regulatory Submission Portal";
  }, []);

  const activeCount = submissions.filter((submission) =>
    ["Submitted", "Under Review", "Additional Information Required"].includes(
      submission.status,
    ),
  ).length;
  const completedCount = submissions.filter((submission) =>
    ["Approved", "Closed"].includes(submission.status),
  ).length;

  return (
    <>
      <div className="page-heading heading-with-action">
        <div>
          <p className="eyebrow">Regulatory submissions</p>
          <h1>Your submissions</h1>
          <p>
            Create and track regulatory applications from initial submission
            through completion.
          </p>
        </div>
        <Link className="button" to="/submissions/new">
          Create submission
        </Link>
      </div>

      {error && (
        <div className="alert alert-error" role="alert">
          <strong>Unable to load submissions.</strong>
          <span>{error}</span>
        </div>
      )}

      {!error && (
        <>
          <section className="summary-grid" aria-label="Submission summary">
            <article>
              <span>Total</span>
              <strong>{submissions.length}</strong>
            </article>
            <article>
              <span>Drafts</span>
              <strong>
                {
                  submissions.filter(
                    (submission) => submission.status === "Draft",
                  ).length
                }
              </strong>
            </article>
            <article>
              <span>In progress</span>
              <strong>{activeCount}</strong>
            </article>
            <article>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </article>
          </section>

          <section aria-labelledby="submission-list-heading">
            <h2 id="submission-list-heading">Submission history</h2>
            <SubmissionList submissions={submissions} />
          </section>
        </>
      )}
    </>
  );
}

function loadSubmissions(): { submissions: Submission[]; error: string } {
  try {
    return { submissions: submissionRepository.list(), error: "" };
  } catch {
    return {
      submissions: [],
      error:
        "Saved submissions could not be loaded. Clear this site's browser storage and try again.",
    };
  }
}

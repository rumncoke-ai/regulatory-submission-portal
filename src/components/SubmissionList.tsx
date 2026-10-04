import { Link } from "react-router-dom";
import type { Submission } from "../domain";
import StatusBadge from "./StatusBadge";

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function SubmissionList({
  submissions,
}: {
  submissions: Submission[];
}) {
  if (submissions.length === 0) {
    return (
      <div className="empty-state">
        <h2>No submissions yet</h2>
        <p>Create your first regulatory submission.</p>
        <Link className="button" to="/submissions/new">
          Create submission
        </Link>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table>
        <caption className="visually-hidden">Regulatory submissions</caption>
        <thead>
          <tr>
            <th scope="col">Reference</th>
            <th scope="col">Organization</th>
            <th scope="col">Submission type</th>
            <th scope="col">Last updated</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td data-label="Reference">
                <Link to={`/submissions/${submission.id}`}>
                  {submission.referenceNumber}
                </Link>
              </td>
              <td data-label="Organization">
                {submission.organizationName}
              </td>
              <td data-label="Submission type">
                {submission.submissionType}
              </td>
              <td data-label="Last updated">
                {dateFormatter.format(new Date(submission.updatedAt))}
              </td>
              <td data-label="Status">
                <StatusBadge status={submission.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

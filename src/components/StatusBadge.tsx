import type { SubmissionStatus } from "../domain";

export default function StatusBadge({ status }: { status: SubmissionStatus }) {
  const className = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`status status-${className}`}>{status}</span>;
}


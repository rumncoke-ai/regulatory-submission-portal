import { Link } from "react-router-dom";

export default function NotFoundPage() {
  useEffectTitle();
  return (
    <div className="empty-state">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link className="button" to="/">
        Return to submissions
      </Link>
    </div>
  );
}

function useEffectTitle() {
  document.title = "Page not found | Regulatory Submission Portal";
}


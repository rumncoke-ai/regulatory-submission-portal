import type { SubmissionStatus } from "../domain";
import { useLanguage } from "../LanguageContext";

export default function StatusBadge({ status }: { status: SubmissionStatus }) {
  const { language } = useLanguage();
  const className = status.toLowerCase().replaceAll(" ", "-");
  const frenchStatuses: Record<SubmissionStatus, string> = {
    Draft: "Brouillon",
    Submitted: "Soumise",
    "Under Review": "En cours d’examen",
    "Additional Information Required": "Renseignements supplémentaires requis",
    Approved: "Approuvée",
    Closed: "Fermée",
  };
  return (
    <span className={`status status-${className}`}>
      {language === "fr" ? frenchStatuses[status] : status}
    </span>
  );
}

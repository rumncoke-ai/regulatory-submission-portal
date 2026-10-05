import { useEffect, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import StatusBadge from "../components/StatusBadge";
import { statusDescriptions, type Submission } from "../domain";
import { submissionRepository } from "../repository";

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "long",
  timeStyle: "short",
};

export default function SubmissionDetailPage() {
  const { language } = useLanguage();
  const { id = "" } = useParams();
  const location = useLocation();
  const { submission, loadError } = useMemo(() => loadSubmission(id), [id]);
  const dateFormatter = new Intl.DateTimeFormat(
    language === "fr" ? "fr-CA" : "en-CA",
    dateFormatOptions,
  );

  useEffect(() => {
    document.title = submission
      ? `${submission.referenceNumber} | ${
          language === "fr"
            ? "Portail des soumissions réglementaires"
            : "Regulatory Submission Portal"
        }`
      : `${
          language === "fr" ? "Soumission introuvable" : "Submission not found"
        } | ${
          language === "fr"
            ? "Portail des soumissions réglementaires"
            : "Regulatory Submission Portal"
        }`;
  }, [language, submission]);

  if (loadError) {
    return (
      <div className="alert alert-error" role="alert">
        {language === "fr"
          ? "La soumission enregistrée n’a pas pu être chargée."
          : "The saved submission could not be loaded."}
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
        <h1>
          {language === "fr" ? "Soumission introuvable" : "Submission not found"}
        </h1>
        <p>
          {language === "fr"
            ? "La soumission demandée n’existe pas."
            : "The requested submission does not exist."}
        </p>
        <Link className="button" to="/">
          {language === "fr"
            ? "Retour aux soumissions"
            : "Return to submissions"}
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
            {language === "fr"
              ? createdState.asDraft
                ? "Brouillon enregistré."
                : "Soumission reçue."
              : createdState.asDraft
                ? "Draft saved."
                : "Submission received."}
          </strong>
          <span>
            {language === "fr"
              ? "Votre numéro de référence est"
              : "Your reference number is"}{" "}
            {submission.referenceNumber}.
          </span>
        </div>
      )}
      <div className="page-heading">
        <p className="eyebrow">
          {language === "fr" ? "Détails de la soumission" : "Submission details"}
        </p>
        <h1>{submission.referenceNumber}</h1>
        <div className="status-heading">
          <span>{language === "fr" ? "Statut" : "Status"}</span>
          <StatusBadge status={submission.status} />
          <span>
            {language === "fr"
              ? frenchStatusDescriptions[submission.status]
              : statusDescriptions[submission.status]}
          </span>
        </div>
      </div>

      <div className="detail-grid">
        <section className="detail-card" aria-labelledby="overview-heading">
          <h2 id="overview-heading">{language === "fr" ? "Aperçu" : "Overview"}</h2>
          <dl>
            <div>
              <dt>{language === "fr" ? "Organisation" : "Organization"}</dt>
              <dd>{submission.organizationName}</dd>
            </div>
            <div>
              <dt>
                {language === "fr" ? "Type de soumission" : "Submission type"}
              </dt>
              <dd>{submission.submissionType}</dd>
            </div>
            <div>
              <dt>{language === "fr" ? "Créée le" : "Created"}</dt>
              <dd>{dateFormatter.format(new Date(submission.createdAt))}</dd>
            </div>
            <div>
              <dt>{language === "fr" ? "Dernière mise à jour" : "Last updated"}</dt>
              <dd>{dateFormatter.format(new Date(submission.updatedAt))}</dd>
            </div>
          </dl>
        </section>

        <section className="detail-card" aria-labelledby="contact-heading">
          <h2 id="contact-heading">
            {language === "fr"
              ? "Organisation et personne-ressource"
              : "Organization and contact"}
          </h2>
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
            <strong>
              {language === "fr" ? "Personne-ressource" : "Contact"}
            </strong>
            <br />
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
          <h2 id="description-heading">
            Description
          </h2>
          <p>
            {submission.description ||
              (language === "fr"
                ? "Aucune description n’a été fournie."
                : "No description has been provided.")}
          </p>
        </section>

        <section
          className="detail-card detail-card-wide"
          aria-labelledby="documents-heading"
        >
          <h2 id="documents-heading">
            {language === "fr"
              ? "Documents justificatifs"
              : "Supporting documents"}
          </h2>
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
            <p>
              {language === "fr"
                ? "Aucun document justificatif n’a été ajouté."
                : "No supporting documents were added."}
            </p>
          )}
          <p className="hint">
            {language === "fr"
              ? "Le contenu des fichiers n’est pas conservé par ce portail."
              : "File contents are not retained by this portal."}
          </p>
        </section>
      </div>

      <p>
        <Link to="/">
          {language === "fr"
            ? "← Retour à toutes les soumissions"
            : "← Back to all submissions"}
        </Link>
      </p>
    </>
  );
}

const frenchStatusDescriptions: Record<Submission["status"], string> = {
  Draft: "Cette soumission a été enregistrée, mais pas envoyée.",
  Submitted: "La soumission a été reçue pour traitement.",
  "Under Review": "L’équipe d’examen évalue la soumission.",
  "Additional Information Required":
    "Des renseignements supplémentaires sont nécessaires pour poursuivre l’examen.",
  Approved: "L’examen a été effectué avec succès.",
  Closed: "Le traitement de cette soumission est terminé.",
};

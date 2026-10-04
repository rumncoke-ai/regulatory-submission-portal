# Business Requirements Document

## Regulatory Submission Processing Portal

**Document status:** Fictional demonstration content  
**Scope:** Baseline portal and planned document-validation enhancement

> This document and the portal it describes are fictional. They do not
> represent Canadian Food Inspection Agency (CFIA) policies, systems,
> regulatory decisions, or business processes.

## 1. Purpose

The Regulatory Submission Processing Portal provides a simple online service
for creating, submitting, and tracking regulatory applications. It is intended
to demonstrate a modern, accessible government-style digital service using
invented organizations, people, submissions, and decisions.

## 2. Users

- **Applicants:** Organization representatives who create, save, submit, and
  review applications.
- **Review staff:** A future user group that would review submissions, request
  information, and update statuses. Reviewer functionality is outside the
  baseline scope.

No authentication, authorization, or real user accounts are included in the
demonstration.

## 3. Functional Requirements

The portal shall:

1. Display a dashboard summarizing submissions by status.
2. Display a responsive list of current and previous submissions.
3. Allow an applicant to create a submission.
4. Allow an applicant to save a partially completed submission as a draft.
5. Allow an applicant to submit a completed application.
6. Generate a unique portal reference number for each saved submission.
7. Display submission details, contact information, attachments, and status.
8. Persist demonstration records in the applicant's browser.
9. Seed the portal with invented sample submissions when no saved data exists.
10. Clearly disclose in the footer that the portal is a demonstration.

## 4. Submission Lifecycle

Submissions may use the following statuses:

1. **Draft** - Saved but not submitted.
2. **Submitted** - Received by the portal.
3. **Under Review** - Being assessed by review staff.
4. **Additional Information Required** - More information is needed.
5. **Approved** - Review has been completed successfully.
6. **Closed** - Processing is complete.

The baseline allows applicants to create Draft and Submitted records. Status
changes performed by review staff are reserved for a future enhancement.

## 5. Required Submission Fields

A completed submission requires:

- Legal organization name
- Street address
- City
- Province or territory
- Contact first name
- Contact last name
- Contact email address
- Submission type
- Submission description

A draft requires only an organization name. Phone number and supporting
documents are optional.

## 6. Document Upload Requirements

- Applicants may select one or more supporting documents.
- The baseline shall retain document metadata only: file name, reported media
  type, and file size.
- The baseline shall not upload, store, download, or inspect file contents.
- Applicants shall be able to remove selected documents before saving.
- Planned enhancement: accepted document types and maximum file size shall be
  configurable and validated before submission.

## 7. Validation Requirements

- Required fields shall be validated before final submission.
- Email addresses shall use a valid basic email format.
- Validation errors shall be associated with the relevant input and announced
  to assistive technology.
- Draft saving shall require an organization name.
- Storage failures shall be shown to the user rather than silently ignored.
- Planned enhancement: invalid document types and oversized documents shall be
  rejected with specific, actionable messages and automated test coverage.

## 8. Accessibility Requirements

The portal shall target WCAG 2.1 Level AA principles, including:

- Semantic headings, landmarks, lists, tables, and form controls
- A keyboard-accessible skip link and navigation
- Programmatically associated labels, instructions, and validation errors
- Visible keyboard focus indicators
- Sufficient text and interface colour contrast
- Status information conveyed with text, not colour alone
- Keyboard-operable actions
- Responsive layouts without horizontal page overflow at supported widths
- Support for reduced-motion preferences

Automated checks shall supplement manual keyboard and assistive-technology
testing.

## 9. Non-Functional Requirements

- **Usability:** The interface shall use clear language and consistent controls.
- **Responsiveness:** Core workflows shall work on mobile, tablet, and desktop
  screen sizes.
- **Performance:** Dashboard and form interactions shall respond promptly for
  the small demonstration dataset.
- **Reliability:** Saved records shall remain available in the same browser
  until site data is cleared or the storage schema changes.
- **Privacy:** Users shall be instructed not to enter real personal, business,
  or regulatory information.
- **Maintainability:** Domain models, status definitions, sample data, and
  persistence logic shall remain separated from page components.
- **Testability:** Existing dashboard, form validation, persistence, and detail
  behavior shall be covered by automated unit or component tests.
- **Security boundary:** The portal is not production-ready and shall not claim
  secure document storage, identity verification, malware scanning, or
  regulatory system integration.

## 10. Domain Glossary

- **Submission:** An application and its supporting information created for
  regulatory review.
- **Applicant:** The organization representative who prepares and submits a
  Submission.
- **Supporting Document:** A file selected by an Applicant to provide
  additional information. The demonstration retains metadata only.
- **Submission Status:** The current stage of a Submission in its lifecycle.
- **Draft:** Saved by the Applicant but not submitted.
- **Submitted:** Received by the portal and awaiting review.
- **Under Review:** Being assessed by review staff.
- **Additional Information Required:** Paused until the Applicant provides
  requested information.
- **Approved:** Review completed with a positive decision.
- **Closed:** Processing is complete and no further action is expected.

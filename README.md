# Regulatory Submission Processing Portal

A browser-based regulatory submission portal built as a software development
demonstration. It models how an organization might create and track regulatory
submissions without representing any real government service.

> **Important:** All data, submission types, statuses, organizations, contacts,
> and workflows are invented. This application does not represent any
> government organization. Do not enter real personal, business, or regulatory
> information.

## Baseline features

- Dashboard with submission summary counts
- Responsive list of sample submissions
- New submission form with basic required-field validation
- Draft saving
- Simulated supporting-document selection
- Submission detail and status views
- Browser-local persistence using `localStorage`
- Keyboard-accessible, responsive interface
- Unit and component tests

The application stores only selected document names, reported media types, and
sizes. It does not upload or retain document contents.

## Technology

- React and TypeScript
- Vite
- React Router
- React Hook Form
- Vitest and React Testing Library

This intentionally simple architecture has no API, database, authentication,
or cloud dependency.

## Prerequisites

- Node.js 20 or later
- npm 10 or later

## Run locally

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173`.

## Test and validate

Run the unit and component tests once:

```powershell
npm test
```

Run tests in watch mode:

```powershell
npm run test:watch
```

Run the TypeScript compiler:

```powershell
npm run typecheck
```

Run ESLint:

```powershell
npm run lint
```

Create a production build:

```powershell
npm run build
```

## Sample data and local persistence

The first visit seeds six sample submissions from
`sample-data/submissions.json` in the browser. New
submissions and drafts are saved only in that browser's `localStorage`. To
restore the original sample data, clear site data for the local Vite origin and
reload the page.

## Accessibility

The baseline uses semantic landmarks, a skip link, native form controls,
programmatically associated labels and field errors, visible keyboard focus,
text status labels, responsive layouts, and colour combinations intended to
meet WCAG 2.1 AA contrast expectations.

Automated tests supplement, but do not replace, manual keyboard and assistive
technology checks.

## Intentionally deferred Cloud Agent enhancement

Document upload validation is deliberately unfinished for a later GitHub
Copilot Cloud Agent task. That task should add:

- Validation of uploaded document types
- Configurable file-size validation
- Enhanced validation error messages
- Tests for invalid document uploads

The baseline accepts any selected file and stores metadata only. The future
enhancement must continue to avoid retaining file contents.

Reviewer controls for changing submission statuses are also outside this
public-facing baseline.
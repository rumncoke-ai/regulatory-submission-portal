# Application Architecture

## Overview

The Regulatory Submission Processing Portal is a client-only React and
TypeScript single-page application built with Vite. It has no API, database,
authentication service, or cloud dependency. Submission records are stored in
the browser's `localStorage`.

## Application Components

### Entry point and routing

- `src/main.tsx` mounts React, configures `BrowserRouter`, and loads global CSS.
- `src/App.tsx` defines three primary routes:
  - `/` - dashboard and submission list
  - `/submissions/new` - new submission form
  - `/submissions/:id` - submission details
- Unknown routes render the not-found page.

### Pages

- `DashboardPage` loads submissions, calculates status summaries, and renders
  the responsive submission list.
- `NewSubmissionPage` uses React Hook Form for field state and basic validation.
  It creates Draft or Submitted records through the repository.
- `SubmissionDetailPage` loads one record by ID and presents its status,
  organization, contact, description, and attachment metadata.
- `NotFoundPage` provides a recovery path for unknown URLs.

### Shared components

- `AppShell` provides the header, primary navigation, skip link, main landmark,
  and footer disclaimer.
- `SubmissionList` renders a semantic table that becomes a stacked layout on
  small screens.
- `StatusBadge` maps submission statuses to text and visual treatments.
- `styles.css` contains global tokens, component styles, responsive rules,
  focus treatments, and reduced-motion behavior.

### Domain and data

- `domain.ts` defines submission types, statuses, TypeScript interfaces, and
  status descriptions.
- `sample-data/submissions.json` is the source of the six initial records.
- `sampleData.ts` validates the JSON fixture with Zod before exporting it.
- `repository.ts` defines the `SubmissionRepository` interface and its
  `LocalStorageSubmissionRepository` implementation.

## Data Flow

### Initial load

1. A page requests records from the repository.
2. The repository reads the versioned `localStorage` key.
3. If the key is absent, the validated JSON sample records are written to
   storage and returned.
4. The dashboard calculates summary counts and passes records to
   `SubmissionList`.

### Creating a submission

1. React Hook Form collects and validates field values.
2. Selected files are converted to metadata in component state; file contents
   are never persisted.
3. The form calls `submissionRepository.create()` with Draft or Submitted
   status.
4. The repository assigns a UUID, generates an `RSP-{year}-{sequence}`
   reference, adds timestamps, and writes the new collection to `localStorage`.
5. The application navigates to the new submission's detail route.

### Viewing details

1. The route supplies the submission ID.
2. The repository reads the stored collection and finds the matching record.
3. The page renders the record or a not-found/error state.

Storage and JSON parsing errors are surfaced in page alerts. The repository
currently checks that stored data is an array but does not fully validate every
stored record against a runtime schema.

## Repository Structure

```text
.
|-- docs/
|   |-- architecture.md
|   `-- business-requirements.md
|-- sample-data/
|   `-- submissions.json
|-- src/
|   |-- components/          Shared layout and presentation components
|   |-- pages/               Route-level components
|   |-- test/setup.ts        Vitest and Testing Library setup
|   |-- App.tsx              Route definitions
|   |-- App.test.tsx         Page and workflow tests
|   |-- domain.ts            Domain types and constants
|   |-- repository.ts        Persistence interface and implementation
|   |-- repository.test.ts   Repository tests
|   |-- sampleData.ts        Runtime validation of sample JSON
|   |-- styles.css           Global and responsive styling
|   `-- main.tsx             Browser entry point
|-- index.html
|-- package.json
|-- tsconfig*.json
`-- vite.config.ts
```

## Testing Approach

Vitest runs in JSDOM with React Testing Library and `user-event`.

- `repository.test.ts` verifies seed loading, all expected statuses, record
  creation, reference generation, retrieval, and malformed top-level storage.
- `App.test.tsx` verifies dashboard content, required-field validation,
  submission details, attachments, disclaimer content, and unknown IDs.
- `test/setup.ts` adds DOM matchers, cleans rendered components, and clears
  `localStorage` after each test.

Developer quality checks:

```powershell
npm test
npm run lint
npm run typecheck
npm run build
```

There is currently no end-to-end browser test suite.

## Important Design Decisions

- **Client-only architecture:** Keeps the demonstration easy to run, but data
  is browser-specific and unsuitable for production or multiple users.
- **Repository boundary:** Pages depend on a small interface so a future API
  implementation can replace `localStorage` with limited UI changes.
- **Versioned storage key:** Schema or seed changes can use a new key to avoid
  interpreting incompatible browser data.
- **Validated seed fixture:** Zod checks the checked-in JSON data at startup,
  preventing invalid sample records from silently reaching the interface.
- **Metadata-only attachments:** The portal stores file name, media type, and
  size, never file contents. Type and configurable size validation are
  intentionally deferred.
- **Native accessibility first:** Semantic HTML, native controls, associated
  errors, keyboard focus, textual statuses, and responsive CSS are preferred
  over custom widgets.
- **Centralized status model:** Labels and descriptions are shared across
  pages. Reviewer-driven status transitions remain outside the baseline.
- **No production identity or security claims:** Authentication, authorization,
  secure document handling, malware scanning, audit logging, and real
  regulatory integration are not implemented.

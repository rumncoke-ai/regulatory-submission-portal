# Accessibility Requirements

## Target

The Regulatory Submission Processing Portal shall target **WCAG 2.1 Level AA**
for all baseline pages and workflows.

Accessibility is a release requirement, not an optional enhancement. Automated
checks shall supplement, but not replace, manual testing.

## General Requirements

- Use semantic HTML and native browser controls wherever practical.
- Provide a descriptive page title and one clear level-one heading per page.
- Use headings in a logical hierarchy without skipping levels unnecessarily.
- Identify header, navigation, main content, and footer landmarks.
- Provide a keyboard-accessible skip link to the main content.
- Ensure content remains understandable when CSS is unavailable.
- Do not rely on colour, position, shape, or visual styling alone to convey
  meaning.

## Keyboard and Focus

- All interactive elements shall be operable using only a keyboard.
- Keyboard focus order shall follow the visual and reading order.
- Focus indicators shall be clearly visible and meet contrast expectations.
- Components shall not trap keyboard focus.
- Opening, closing, saving, submitting, and removing documents shall not
  require a pointer device.
- Route changes and validation failures shall provide a predictable focus
  experience.

## Forms and Validation

- Every input shall have a persistent, programmatically associated label.
- Required fields shall be identified in text and programmatically.
- Instructions shall appear before users need them.
- Errors shall identify the affected field and explain how to correct it.
- Field errors shall be programmatically associated with their inputs.
- Invalid fields shall expose their invalid state to assistive technology.
- Submission-level errors shall be announced and shall not rely on colour
  alone.
- Entered values shall remain available after validation fails.

## Content and Status

- Link and button text shall describe its purpose without requiring surrounding
  context.
- Submission statuses shall always be displayed as text, even when colour
  badges are used.
- Dates, reference numbers, field labels, and table headings shall be clear and
  consistent.
- Instructions and messages shall use concise, plain language.
- Images, if introduced, shall have meaningful alternative text or be marked
  decorative.

## Tables and Responsive Layout

- Data tables shall include a caption and correctly scoped column or row
  headers.
- Responsive transformations shall preserve labels and reading order.
- Core content and actions shall remain usable at 320 CSS pixels wide.
- Pages shall not require horizontal scrolling at supported viewport widths,
  except where necessary for inherently two-dimensional content.
- Content shall remain usable at 200% browser zoom and with text spacing
  overrides.

## Visual Presentation

- Normal text shall meet a contrast ratio of at least 4.5:1.
- Large text shall meet a contrast ratio of at least 3:1.
- User interface components, focus indicators, and meaningful graphics shall
  meet a contrast ratio of at least 3:1 against adjacent colours.
- Text shall remain readable when resized to 200%.
- Interactive controls shall have a clear hover, focus, active, and disabled
  state where applicable.
- Motion shall be limited and reduced when the user requests reduced motion.

## Assistive Technology

- Dynamic success, error, and status messages shall be exposed to screen
  readers using appropriate live-region semantics.
- Names, roles, values, and states of controls shall be programmatically
  determinable.
- Custom ARIA shall be used only when native HTML cannot provide the required
  semantics.
- File-selection and removal controls shall expose the relevant file name in
  their accessible name.

## Verification

Before release, the team shall:

1. Run automated accessibility checks on the dashboard, new submission form,
   validation-error state, submission detail page, and not-found page.
2. Complete the primary workflow using only a keyboard.
3. Verify page structure and form feedback with a screen reader.
4. Check contrast for text, controls, status badges, focus indicators, and
   alerts.
5. Test mobile width, 200% zoom, text spacing, and reduced-motion settings.
6. Record and resolve Level A and AA failures introduced by a change.

## Known Baseline Limitations

- Automated accessibility scanning is not yet part of the test suite.
- Formal testing with multiple screen reader and browser combinations has not
  been completed.
- These gaps shall be documented and must not be interpreted as confirmation
  of full WCAG conformance.

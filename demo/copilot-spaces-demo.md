# Set Up GitHub Copilot Spaces for the Regulatory Submission Portal

Use this guide to create a GitHub Copilot Space with the requirements, architecture, terminology, and code needed to understand the Regulatory Submission Portal and prepare a development issue.

> The portal and its supporting materials are fictional. They do not represent an actual Canadian Food Inspection Agency system, policy, workflow, decision process, or architecture.

## Prerequisites

- Access to [GitHub Copilot Spaces](https://github.com/copilot/spaces)
- Access to the Regulatory Submission Portal repository
- Permission to view the repository files and issues you plan to add

## 1. Create the Space

1. Open [GitHub Copilot Spaces](https://github.com/copilot/spaces).
2. Select **Create Space**.
3. Set the name to `Regulatory Submission Portal`.
4. Choose the appropriate personal or organization owner.
5. Add this description:

   ```text
   Project context for understanding the Regulatory Submission Portal, answering requirement questions, comparing requirements with the implementation, and defining development work.
   ```

6. Save the Space.

## 2. Add Space Instructions

Open **Instructions**, paste the following content, and save it:

```markdown
# Regulatory Submission Portal

Act as a development assistant for this fictional project.

Use the resources in this Space as the source of truth for business requirements, workflows, architecture, data models, validation, accessibility, terminology, tests, and existing behavior.

When answering project questions:

- Cite the supporting Space resources when possible.
- Separate documented facts from assumptions.
- Say when the available resources do not define something.
- Do not invent regulatory requirements.

When comparing requirements with the implementation:

1. Identify the documented requirement and its source.
2. Inspect the relevant implementation and tests.
3. Classify the requirement as Implemented, Partially Implemented, Missing, or Unclear.
4. Identify the relevant files and the smallest reasonable change.

Prefer maintainable changes that preserve existing behavior and API contracts. Consider validation, accessibility, error handling, tests, and documentation. Do not modify code unless explicitly asked.

Do not add real personal, company, government, inspection, or regulatory data. Do not present this project's fictional workflows or designs as actual CFIA processes.

If sources conflict, identify the conflict and the decision that must be clarified.
```

## 3. Add Project Sources

Select **Add sources**, choose the repository, and add the most relevant files:

```text
README.md
docs/business-requirements.md
docs/architecture.md
docs/accessibility-requirements.md
docs/terminology.md
sample-data/submissions.json
src/components/AppShell.tsx
src/styles.css
src/App.test.tsx
```

## 4. Understand the Project

Ask the Space:

```text
I'm joining this project as a developer.

Using only the context available in this Space, explain:

1. What this application does
2. Who its users are
3. The major application components
4. The information captured in a regulatory submission
5. How a submission moves through the lifecycle

For each section, identify the project sources that support your answer. If the Space does not define something, say so instead of making an assumption.
```

Then verify the requirements relevant to dark mode:

```text
We want to add dark mode to the application.

Using only the project sources, identify the documented accessibility, visual presentation, interaction, and testing requirements that apply to a dark-mode feature.

For each requirement, explain it in plain language, cite its source, and state whether it is explicitly documented or inferred. Identify any dark-mode behavior that the sources do not define. Do not inspect implementation gaps or modify code.
```

## 6. Compare Requirements with the Implementation

Use this prompt:

```text
Compare the request to add dark mode with the current implementation and the documented accessibility requirements. Do not change code.

Provide:

1. The current theme and color implementation
2. The best location for an accessible theme toggle
3. The relevant implementation and test files
4. The documented requirements and sources that the feature must satisfy
5. The smallest maintainable change
6. Any undefined behavior that requires a product decision

Check keyboard operation, programmatic name and state, focus visibility, color contrast, responsive behavior, persistence across page reloads, and automated tests. Separate confirmed findings from assumptions.
```

Review the response against the cited sources before using it to define work.

## 7. Create Acceptance Criteria

Ask Copilot to turn confirmed gaps into acceptance criteria:

```text
Create implementation-ready acceptance criteria for adding dark mode to the application.

Include the theme toggle, light and dark appearance, persistence across page reloads, keyboard and screen-reader accessibility, WCAG 2.1 AA color contrast, visible focus states, responsive behavior, automated tests, documentation updates, and constraints that avoid unnecessary API or architecture changes.

Use only requirements supported by the Space. Mark undefined values or behavior as decisions to confirm. Do not implement the change.
```

After reviewing the criteria, create a GitHub issue with this prompt:

```text
Turn the approved acceptance criteria into a concise GitHub issue with:

- Title
- Background and problem
- Acceptance criteria
- Required tests
- Documentation updates
- Technical constraints
- Open decisions

Make the issue specific enough for a developer or coding agent to investigate, without prescribing unsupported implementation details.
```

## Completion Check

- [ ] The Space has focused instructions and project sources.
- [ ] Answers cite project sources and distinguish facts from assumptions.
- [ ] Requirements have been compared with implementation and tests.
- [ ] Confirmed gaps have testable acceptance criteria.
- [ ] The GitHub issue has been reviewed by a person.

Next, use the issue with the [GitHub Copilot Cloud Agent setup guide](./copilot-cloud-agent-demo.md).

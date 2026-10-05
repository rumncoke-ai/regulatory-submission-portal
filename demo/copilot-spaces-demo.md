# GitHub Copilot Spaces Demo: Regulatory Submission Portal

Welcome to the GitHub Copilot Spaces demo for the **Regulatory Submission Portal**. In this exercise, you will create a Copilot Space that brings together business requirements, architecture, terminology, accessibility guidance, and source code for a fictional regulatory document-processing application.

The portal and all supporting materials are fictional demonstration content. They do not represent an actual Canadian Food Inspection Agency system, policy, workflow, regulatory decision process, or technical architecture.

## What You'll Learn

By the end of this demo, you will:

- [ ] Understand the purpose and benefits of GitHub Copilot Spaces
- [ ] Create a Space for a focused application-development scenario
- [ ] Add project instructions and curated reference sources
- [ ] Use the Space to understand an unfamiliar application
- [ ] Ground answers in business and technical documentation
- [ ] Compare documented requirements with the current implementation
- [ ] Convert an identified gap into implementation-ready acceptance criteria
- [ ] Prepare a development task that can be delegated to GitHub Copilot Cloud Agent

**Suggested demo duration:** 20–25 minutes

---

## Scenario

A development team supports a fictional **Regulatory Submission Portal**. The application allows an organization to create and track regulatory submissions containing contact information, submission details, and supporting documents.

The repository contains a working baseline application, but the source code is not the complete source of project knowledge. The team must also work with:

- Business requirements
- Architecture documentation
- Accessibility guidance
- Project terminology
- Validation expectations
- Testing standards

In this demo, GitHub Copilot Spaces will provide a curated project context that helps the development team understand the application, answer requirement questions, and identify a deliberate gap in supporting-document validation.

---

# 🎯 Step 1: Create the Regulatory Submission Portal Space

**Goal:** Create a dedicated Copilot Space that provides consistent project context for the development team.

## Setup

1. Go to [GitHub Copilot Spaces](https://github.com/copilot/spaces).
2. Select **Create Space**.
3. Enter the following name:

```text
Regulatory Submission Portal
```

4. Select the appropriate personal or organization owner.
5. Add the following description:

```text
A project workspace for the Regulatory Submission Portal, bringing together application requirements, architecture, terminology, accessibility guidance, and source code. Use this Space to understand project context, answer requirement questions, identify gaps between requirements and implementation, and define development work.
```

6. Select **Save**.

**Expected result:** A new Copilot Space is created and opened.

---

## Add Space Instructions

1. In the Space, select **Instructions**.
2. Add the following instructions:

```markdown
# Regulatory Submission Portal

You are assisting developers working on the **Regulatory Submission Portal** application 

## Project purpose

The Regulatory Submission Portal demonstrates how a government regulatory organization could receive, validate, process, and track regulatory submissions and their supporting documentation.

## Your role

Act as a development assistant for this project.

Use the resources included in this Space as the primary source of truth when answering questions about:

- Business requirements
- Application functionality
- Submission workflows
- Architecture
- Data models
- Validation rules
- Accessibility requirements
- Project terminology
- Testing expectations
- Existing implementation

When answering project-specific questions, ground your response in the available Space resources whenever possible.

## Application concepts

The application handles regulatory submissions containing information such as:

- Submission ID
- Organization name
- Contact information
- Submission type
- Description
- Supporting documents
- Submission date
- Submission status

The submission lifecycle includes:

**Draft → Submitted → Under Review → Additional Information Required → Approved or Closed**

Use the project documentation as the source of truth if it contains more specific requirements.

## Working with requirements

When asked about a requirement:

1. Identify the relevant requirement from the Space resources.
2. Explain it in plain language.
3. Identify the project resource supporting the answer when possible.
4. Distinguish documented requirements from assumptions.

Never invent a requirement simply because it would be reasonable for a regulatory application.

If the available resources do not specify something, explicitly say that the current project documentation does not define it.

## Analyzing the implementation

When asked to compare requirements with the application:

1. Review the documented requirement.
2. Review the relevant implementation.
3. Determine whether the requirement appears implemented, partially implemented, or missing.
4. Identify the relevant files.
5. Explain the gap.
6. Recommend the smallest reasonable change.

Do not modify code unless explicitly asked.

## Development principles

When suggesting or implementing changes:

- Prefer simple, maintainable solutions.
- Preserve existing application behavior unless a requirement calls for a change.
- Avoid unnecessary dependencies or architectural changes.
- Consider accessibility when making user-facing changes.
- Consider validation and error handling.
- Add or update automated tests when behavior changes.
- Update relevant documentation when necessary.
- Preserve existing API contracts unless the requirements explicitly call for a change.

## Security and data
Do not introduce real personal information, confidential government information, inspection records, regulatory cases, company submissions, or other sensitive information.

Do not claim that fictional workflows, terminology, statuses, validation rules, or technical designs represent actual CFIA processes.

## When information conflicts

If two Space resources appear inconsistent:

- Identify the conflicting resources.
- Explain the discrepancy.
- Do not silently choose one interpretation.
- Recommend what should be clarified before implementation.

## Response style

Keep responses practical and developer-focused.

For technical questions:
- Reference relevant project files.
- Explain reasoning clearly.
- Provide actionable recommendations.
- Separate confirmed project requirements from suggestions.

For business or project-management questions:
- Explain technical concepts in clear, non-technical language.
- Focus on expected behavior and outcomes rather than implementation details.

The objective is to help the project team understand the application, identify gaps between requirements and implementation, and turn documented requirements into well-defined development work.
```

3. Select **Save**.

**Expected result:** The Space now has persistent instructions that define Copilot's role, sources of truth, boundaries, and response style.

---

# 📚 Step 2: Add Project Sources

**Goal:** Give the Space a curated set of business and technical references.

The exact source-selection labels may vary based on the current GitHub interface and your repository permissions. Add the project repository first, followed by the most relevant individual files, issue, and text reference available in your environment.

## Add the Repository and Project Files

1. Select **Add sources**.
2. Choose the option for adding files and repositories.
3. Select the repository that contains the Regulatory Submission Portal.
4. Add the following project files where available:

```text
README.md
docs/business-requirements.md
docs/architecture.md
docs/accessibility-requirements.md
docs/terminology.md
sample-data/submissions.json
```

5. Add the main implementation files responsible for:

```text
The regulatory submission form
The supporting-document upload component
Submission validation
Submission status display
Existing automated tests
```

6. Select **Save**.

> **Presenter note:** Choose only the files needed to tell the story. A deliberately curated Space demonstrates the value of focused project context more clearly than adding every available file.

---

## Reference Requirement to Include

Ensure that `docs/business-requirements.md` contains a clear requirement similar to the following:

```markdown
## Supporting Document Requirements

- A submission may be saved as a Draft without a supporting document.
- At least one supporting document is required before a submission can move to Submitted status.
- The application must accept only the file types listed in the project configuration.
- The application must reject files that exceed the configured maximum file size.
- Validation errors must clearly explain how the applicant can correct the problem.
- User-facing validation messages must be accessible.
```

The baseline implementation should intentionally **not fully enforce** these requirements. This creates the development gap that Copilot will identify during the demo.

---

## Add the Development Issue

If you have already created the Cloud Agent issue:

1. Select **Add sources**.
2. Choose the option to link files, pull requests, and issues.
3. Add the issue titled:

```text
Add supporting document validation to regulatory submissions
```

4. Select **Save**.

If the issue has not been created yet, omit it from the Space for the first run. You can create it after Copilot produces the acceptance criteria.

---

## Add Text Context

1. Select **Add sources**.
2. Choose **Add text content**.
3. Add the following reference content:

```markdown
# Regulatory Submission Portal Demo Context

## Demonstration purpose

This project is a fictional example of a regulatory document-processing application. It is intended to demonstrate how a development team can use GitHub Copilot Spaces to work with curated project context and GitHub Copilot Cloud Agent to implement a well-defined development task.

## Fictional submission types

- Import documentation
- Export certification
- Licence application
- Product documentation
- Supporting regulatory documentation
- Other

## Fictional submission lifecycle

1. Draft
2. Submitted
3. Under Review
4. Additional Information Required
5. Approved or Closed

## Development priorities

- Clear and maintainable code
- Accessible user experiences
- Consistent validation
- Useful error messages
- Automated test coverage
- Minimal architectural disruption
- Human review before changes are merged

## Important boundary

The project is not an implementation of an actual CFIA system. Its workflows, terminology, requirements, statuses, and technical design are fictional demonstration content.
```

4. Select **Save**.

**Expected result:** The Space contains enough curated context to explain the project, answer requirement questions, compare documentation with implementation, and produce grounded acceptance criteria.

---

# 🤝 Step 3: Use the Space to Understand the Project

**Goal:** Demonstrate how a developer can use the Space to become familiar with an application without manually reading every source first.

## Prompt 1: Project Orientation

Enter the following prompt:

```markdown
I'm joining this project as a developer.

Using only the context available in this Space, explain:

1. What this application does
2. Who its users are
3. The major application components
4. The information captured in a regulatory submission
5. How a submission moves through the fictional lifecycle

For each section, identify the project sources that support your answer. If the Space does not define something, say so instead of making an assumption.
```

### What to observe

- Does the answer draw from multiple project sources?
- Does it distinguish documented facts from missing information?
- Does it explain the project in language that both developers and project managers can follow?

### Presenter talking point

> The source code is only one part of the project's context. The Space also gives Copilot access to the application's requirements, architecture, terminology, and standards, so the conversation starts with a more complete understanding of the project.

---

## Prompt 2: Requirements Grounding

Enter the following prompt:

```markdown
According to the project requirements, what information and supporting material must be present before a regulatory submission can move from Draft to Submitted?

For every requirement:

- Explain the requirement in plain language
- Identify the source that defines it
- State whether it is explicitly documented or inferred

Do not inspect implementation gaps yet and do not modify code.
```

### What to observe

- Does Copilot identify the supporting-document requirement?
- Does it ground the response in `docs/business-requirements.md`?
- Does it avoid inventing regulatory rules that are not in the Space?

---

# 🔎 Step 4: Identify the Implementation Gap

**Goal:** Use the Space to compare documented business requirements against the current codebase.

## Prompt 3: Requirements-to-Code Analysis

Enter the following prompt:

```markdown
Compare the documented supporting-document requirements with the current application implementation.

Do not make any code changes.

For each relevant requirement, provide:

1. The documented requirement
2. Its source
3. The current implementation behavior
4. The relevant implementation and test files
5. A classification of Implemented, Partially Implemented, Missing, or Unclear
6. The smallest recommended change

Pay particular attention to:

- Requiring a supporting document before moving to Submitted status
- Allowed file-type validation
- Maximum file-size validation
- Accessible validation messages
- Automated test coverage

Clearly separate confirmed findings from assumptions.
```

### Expected finding

The exact response will depend on the repository, but the intended demonstration outcome is that Copilot identifies one or more missing or incomplete supporting-document validation requirements.

### Presenter talking point

> The useful outcome is not simply a code summary. Copilot is comparing two different forms of project knowledge: what the application is supposed to do and what the current implementation appears to do.

---

# 🧾 Step 5: Generate Implementation-Ready Acceptance Criteria

**Goal:** Convert the identified gap into a clear development task without asking Copilot to modify the code.

## Prompt 4: Acceptance Criteria

Enter the following prompt:

```markdown
Using the supporting-document validation gaps you identified, create implementation-ready acceptance criteria for a GitHub issue.

Include:

- User-visible behavior
- Draft versus Submitted behavior
- Allowed file-type handling
- Maximum file-size handling
- Accessible error messages
- Error scenarios
- Required automated tests
- Documentation updates
- Constraints that prevent unnecessary architectural or API changes

Use only requirements supported by the Space. If a specific file type, file-size limit, or error-message wording is not defined in the project resources, mark it as a decision that must be confirmed rather than inventing a value.

Do not implement the change.
```

### What to observe

- Are the criteria specific and testable?
- Does Copilot preserve the distinction between Draft and Submitted?
- Does it identify missing decisions rather than fabricating values?
- Does it include accessibility, testing, and documentation?

---

## Optional Prompt 5: Create the GitHub Issue Draft

Enter the following prompt:

```markdown
Turn the approved acceptance criteria into a concise GitHub issue.

Use the following structure:

- Title
- Background
- Problem
- Acceptance criteria
- Required tests
- Documentation updates
- Technical constraints
- Open decisions

The issue should be detailed enough for a coding agent or developer to begin repository investigation, but it must not prescribe an implementation that is not supported by the project context.
```

Review the generated issue before using it in the Cloud Agent portion of the demo.

---

# 💬 Step 6: Explore the Space

**Goal:** Show that the same curated context supports different roles and questions.

Choose one or more of the following prompts.

## Business-Friendly Explanation

```markdown
Explain the supporting-document validation gap to a project manager without using implementation-specific terminology.

Cover:

- What users expect
- What the application currently appears to do
- The potential impact
- What the development team should change

Keep the explanation concise and distinguish confirmed findings from assumptions.
```

## Developer Onboarding

```markdown
Which files should a developer inspect before changing supporting-document validation, and why?

Group the files by:

- Requirements
- User interface
- Validation logic
- Configuration
- Tests
- Documentation
```

## Test Planning

```markdown
Create a test matrix for the supporting-document validation requirements.

Include:

- Draft submissions
- Submitted submissions
- Missing documents
- Supported files
- Unsupported files
- Files below the configured limit
- Files above the configured limit
- Accessible validation feedback

Do not invent undefined file types or numeric size limits.
```

## Conflict Detection

```markdown
Review the sources in this Space for conflicting or ambiguous statements about supporting-document validation.

For each conflict or ambiguity:

- Identify the affected sources
- Explain why they are inconsistent or incomplete
- Describe the decision the team must make before implementation
```

---

# 🔗 Step 7: Transition to GitHub Copilot Cloud Agent

Use the following transition in the live demonstration:

> Spaces helped us understand the application, identify the documented requirement, compare it with the current implementation, and define a clear engineering task. We can now delegate that well-scoped task to GitHub Copilot Cloud Agent while keeping the developer responsible for reviewing the resulting changes.

Before moving to the Cloud Agent demo, confirm that you have:

- [ ] A documented implementation gap
- [ ] Approved acceptance criteria
- [ ] A GitHub issue for supporting-document validation
- [ ] A baseline branch where advanced validation is still incomplete
- [ ] Existing tests that establish the baseline behavior
- [ ] A prepared Cloud Agent run or pull request for reliable demonstration

---

# Final Discussion

Use these questions to close the Spaces portion of the demo:

- How did the Space change the quality of Copilot's answers compared with a general chat?
- Which sources were most useful for understanding the application?
- Did Copilot clearly distinguish requirements from assumptions?
- How could a team keep the Space current when requirements or architecture change?
- Which project roles could benefit from the same Space?
- What information should not be added to a shared Space?
- How does a well-grounded Space improve the quality of a task delegated to a coding agent?

**Expected result:** You have used GitHub Copilot Spaces to understand a fictional regulatory application, ground answers in curated project context, identify a requirement-to-implementation gap, and prepare a development task for Cloud Agent.

---

# ✅ Completion Checklist

Mark off each item as you complete it:

## Space Setup

- [ ] Created the Regulatory Submission Portal Space
- [ ] Added the project description
- [ ] Added persistent Space instructions
- [ ] Added the application repository
- [ ] Added relevant business and technical documentation
- [ ] Added relevant source-code and test files
- [ ] Added the fictional demo context

## Spaces Demo

- [ ] Asked Copilot to explain the application
- [ ] Asked a grounded requirements question
- [ ] Compared documented requirements with implementation
- [ ] Identified the supporting-document validation gap
- [ ] Generated implementation-ready acceptance criteria
- [ ] Reviewed Copilot's answer for unsupported assumptions
- [ ] Prepared the GitHub issue for Cloud Agent

## Demo Readiness

- [ ] Confirmed all examples use fictional data
- [ ] Confirmed the demo does not imply an actual CFIA workflow
- [ ] Tested all prompts in the completed Space
- [ ] Verified the intended gap is detectable
- [ ] Prepared a backup screenshot or completed response
- [ ] Prepared the transition into the Cloud Agent demo

---

# 🚀 What's Next?

Continue to the **GitHub Copilot Cloud Agent Demo** and use the supporting-document validation issue as the implementation task.

The intended workflow is:

```text
Curated project context in Spaces
                ↓
Grounded requirements analysis
                ↓
Implementation gap identified
                ↓
Acceptance criteria created
                ↓
GitHub issue reviewed
                ↓
Task delegated to Cloud Agent
                ↓
Developer reviews tests, code changes, and pull request
```

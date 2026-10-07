# Use GitHub Copilot Cloud Agent for a Development Issue

Use this guide to delegate a focused GitHub issue to GitHub Copilot, review its work, and iterate through a pull request.

## Prerequisites

- Access to GitHub Copilot coding agent for the repository
- Permission to create issues and review pull requests
- A repository with its development environment and tests documented

## 1. Create a Focused Issue

In the repository, open **Issues**, select **New issue**, and use:

**Title:** `Add dark mode to the UI`

```markdown
## Description

Users should be able to switch the Regulatory Submission Portal between its existing light appearance and a dark appearance.

Add an accessible theme control to the application shell. Keep the existing light theme as the default and remember the user's selection across page reloads.

## Acceptance criteria

- Add a theme control in the application header that switches between light and dark modes.
- Keep the existing light theme as the default when no preference has been saved.
- Apply the selected theme across every page without changing existing content or workflows.
- Persist the selected theme in browser storage and restore it after a page reload.
- Give the control an accessible name and programmatically determinable state.
- Ensure the control is keyboard operable and has a clearly visible focus indicator in both themes.
- Ensure text, controls, status badges, links, borders, alerts, and focus indicators meet the documented WCAG 2.1 AA contrast requirements in both themes.
- Preserve the existing responsive behavior.
- Add or update relevant automated tests.
- Update relevant user documentation.
- Do not make unrelated changes.

## Expected result

Users can switch the entire application between accessible light and dark themes, and their choice remains in effect after reloading the page.
```

Create the issue and note its number.

## 2. Delegate the Issue

Open GitHub Copilot on GitHub.com, reference the issue, and enter:

```text
Implement this issue according to its acceptance criteria.

Inspect the repository before making changes, follow its existing patterns, run the relevant tests, and avoid unrelated changes.
```

Review the task details, then start the coding task.

## 3. Review the Agent Session

When Copilot opens a pull request, select **View session** and confirm that it:

- Inspected the relevant code and tests
- Followed the issue's acceptance criteria
- Kept the change within scope
- Ran or updated relevant tests
- Reported any problems or limitations

## 4. Review the Pull Request

Review the changed files and verify:

- [ ] A theme control appears in the application header.
- [ ] The control switches every page between light and dark modes.
- [ ] Light mode remains the default when no preference has been saved.
- [ ] The selected theme is restored after a page reload.
- [ ] The control has an accessible name and exposes its current state.
- [ ] The control works with a keyboard and has a visible focus indicator in both themes.
- [ ] Both themes meet the documented WCAG 2.1 AA contrast requirements.
- [ ] Existing content, workflows, and responsive behavior are preserved.
- [ ] Relevant tests were added or updated and pass.
- [ ] Relevant user documentation was updated.
- [ ] No unrelated changes were included.

Do not merge solely because Copilot created the pull request. Apply the same review and approval standards used for any contribution.

## 5. Request Changes if Needed

Leave focused feedback on the pull request or agent session. For example:

```text
Verify that automated tests cover switching themes, the default light theme, and restoring the saved preference after a reload. If coverage is missing, add the necessary tests without making unrelated changes.
```

Or:

```text
Check the dark theme against the documented contrast requirements, including status badges, links, controls, alerts, borders, and focus indicators. Fix any failures without changing unrelated styles.
```

Review the updated code and test results before approving or merging.

## Completion Check

- [ ] The issue defines a clear outcome and testable acceptance criteria.
- [ ] Copilot investigated the repository and implemented only the requested change.
- [ ] A person reviewed the session, code, and tests.
- [ ] Requested revisions were completed and reviewed.
- [ ] The pull request meets the repository's merge requirements.

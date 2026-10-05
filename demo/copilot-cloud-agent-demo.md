# GitHub Copilot Cloud Agent Demo

Welcome to the GitHub Copilot Cloud Agent demo!

In this exercise, you will use GitHub Copilot to implement a small enhancement to the fictional **Regulatory Submission Portal**. The goal is to experience how a well-defined GitHub issue can be delegated to Copilot and then reviewed through the normal pull request workflow.

---

## What You'll Learn

By the end of this demo, you will:

- [ ] Create a well-defined GitHub issue
- [ ] Ask GitHub Copilot to implement an issue
- [ ] Observe Copilot working on the task
- [ ] Review Copilot's agent session
- [ ] Review the resulting pull request and code changes
- [ ] Understand where human review fits into an agentic development workflow

**Estimated Time:** 10 minutes

---

# 🎯 Step 1: Create the Development Issue

**Goal:** Define a small development task for the Regulatory Submission Portal.

1. Go to the **Issues** tab of the Regulatory Submission Portal repository.
2. Select **New issue**.
3. Use the following title:

**Display last updated date on regulatory submissions**

4. Add the following issue description:

```markdown
## Description

Users should be able to see when a regulatory submission was last updated.

Add a **Last Updated** field to the submission details page so users can quickly understand how recently the submission information changed.

## Acceptance Criteria

- Display a **Last Updated** field on the submission details page.
- Position it near the existing submission status information.
- Use the application's existing date formatting conventions.
- Ensure the field is presented accessibly.
- Add or update relevant automated tests.
- Do not make unrelated changes.

## Expected Result

When viewing a regulatory submission, the user can clearly see when the submission was last updated.
```

5. Create the issue.

### Why this issue works well for the demo

The issue describes the desired **outcome and acceptance criteria** without telling Copilot exactly which files to change or how to implement the solution.

This gives Copilot an opportunity to investigate the repository and determine how the enhancement should be implemented.

**Expected Result:** A new GitHub issue is created describing the Last Updated enhancement.

---

# 🤖 Step 2: Ask GitHub Copilot to Implement the Issue

**Goal:** Delegate the development task to GitHub Copilot.

1. From GitHub.com, open **Copilot Chat**.
2. Reference the issue you just created.
3. Ask Copilot:

```text
Implement this issue.
```

Alternatively, use a slightly more explicit prompt:

```text
Implement this issue according to its acceptance criteria.

Inspect the existing repository before making changes and follow the application's existing patterns.

Keep the implementation focused on the requested change and do not make unrelated changes.
```

4. Review the task Copilot has been given.
5. Start the coding task using the available Copilot coding agent workflow.
6. Observe the initial agent activity.

### What to look for

As Copilot works, pay attention to how the agent:

- Investigates the existing repository
- Identifies relevant files
- Determines how the existing submission data is structured
- Implements the requested change
- Updates or adds relevant tests
- Prepares its changes for review

### Discussion

Notice that the issue did not specify exactly which component or file Copilot needed to modify.

The developer provided the **desired outcome and constraints**, while Copilot investigates the repository to determine how to implement the change.

---

# 📚 Step 3: Review Copilot's Session

**Goal:** Understand how Copilot approached the development task.

1. Open the pull request created for the task.
2. Select **View Session** to inspect the agent's work.
3. Review how Copilot approached the issue.

Look for:

- What repository context Copilot inspected
- Which files Copilot determined were relevant
- How Copilot interpreted the acceptance criteria
- What implementation approach Copilot selected
- Whether Copilot ran or updated tests
- Any problems or limitations Copilot encountered

### Discussion

Consider:

- Did Copilot correctly understand the issue?
- Did Copilot inspect the appropriate parts of the repository?
- Did the implementation remain within the scope of the issue?
- Are there decisions you would have made differently as the developer?

**Key takeaway:** The agent's work is still reviewable. Developers can inspect how the task was approached rather than treating the generated result as an automatic final answer.

---

# 🔍 Step 4: Review the Pull Request

**Goal:** Review Copilot's implementation just as you would review another developer's contribution.

1. Return to the pull request.
2. Open the changed-files view.
3. Inspect the code modifications.
4. Compare the implementation against the original issue.

Use the acceptance criteria as your review checklist:

- [ ] Is **Last Updated** displayed on the submission details page?
- [ ] Is the field positioned near the existing status information?
- [ ] Does it follow the application's existing date formatting?
- [ ] Is the new information presented accessibly?
- [ ] Were relevant tests added or updated?
- [ ] Did Copilot avoid unrelated changes?

### Important

Do not merge the pull request simply because Copilot created it.

Treat Copilot's changes like any other code contribution:

**Issue → Implementation → Tests → Review → Approval**

The developer remains responsible for deciding whether the changes meet the project's requirements.

---

# 💬 Step 5: Iterate on Copilot's Work

**Goal:** Demonstrate that the workflow does not end after Copilot produces the first implementation.

If you identify something that could be improved, provide additional feedback.

For example:

```text
Please verify that the Last Updated field is covered by the appropriate automated tests.

If coverage is missing, add the necessary test without making unrelated changes.
```

Or:

```text
Please ensure the Last Updated field follows the same date formatting pattern used elsewhere in the application.

Only make changes if necessary.
```

Review the resulting changes again before approving the pull request.

### Discussion

This demonstrates an important part of agentic development:

The developer does not need to accept the first implementation unchanged.

The workflow can remain iterative:

**Assign → Review → Provide feedback → Agent updates → Review again**

---

# ✅ Completion Checklist

Mark each item as you complete it:

## Issue

- [ ] Created the **Display last updated date on regulatory submissions** issue
- [ ] Added clear acceptance criteria
- [ ] Avoided prescribing unnecessary implementation details

## Copilot

- [ ] Opened Copilot Chat on GitHub.com
- [ ] Referenced the GitHub issue
- [ ] Asked Copilot to implement the issue
- [ ] Started the coding task

## Review

- [ ] Viewed Copilot's agent session
- [ ] Reviewed the files Copilot changed
- [ ] Compared the changes against the acceptance criteria
- [ ] Reviewed relevant tests
- [ ] Provided additional feedback if necessary
- [ ] Reviewed the final pull request

---

# 🎤 Final Discussion

Consider the following questions:

- What information did Copilot need from the issue to successfully begin the task?
- What did Copilot figure out by investigating the repository?
- Was the issue specific enough without prescribing the implementation?
- What parts of Copilot's work still required developer judgment?
- How could your team determine which development tasks are appropriate to delegate to an agent?
- How does code review change when the contributor is a coding agent?

---

# 🚀 What's Next?

Congratulations! You've used GitHub Copilot to take a development task from a GitHub issue through implementation and human review.

In this demo, the workflow was:

**GitHub Issue**
↓  
**Copilot receives the task**
↓  
**Agent investigates the repository**
↓  
**Agent implements the enhancement**
↓  
**Tests and changes are prepared**
↓  
**Pull request is created**
↓  
**Developer reviews the work**
↓  
**Developer provides feedback or approves the change**

The key takeaway is that GitHub Copilot can take on more of the implementation work while the developer remains responsible for defining the desired outcome, reviewing the resulting changes, and deciding whether the implementation should be accepted.

This completes the Regulatory Submission Portal Cloud Agent demo.
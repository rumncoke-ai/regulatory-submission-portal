import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

function renderApp(route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe("Regulatory Submission Portal", () => {
  it("shows the dashboard and sample submissions", async () => {
    renderApp();

    expect(
      await screen.findByRole("heading", { name: "Your submissions" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Aurora Lantern Foods Inc."),
    ).toBeInTheDocument();
    expect(screen.getByText("RSP-2026-0001")).toBeInTheDocument();
    expect(
      screen.getByText(/do not represent any government organization/i),
    ).toBeInTheDocument();
  });

  it("shows required-field validation on an incomplete submission", async () => {
    const user = userEvent.setup();
    renderApp("/submissions/new");

    await user.click(
      screen.getByRole("button", { name: "Submit application" }),
    );

    expect(
      await screen.findByText("Enter the legal organization name."),
    ).toBeInTheDocument();
    expect(screen.getByText("Enter a street address.")).toBeInTheDocument();
    expect(screen.getByText("Enter an email address.")).toBeInTheDocument();
    expect(
      screen.getByText("Enter a submission description."),
    ).toBeInTheDocument();
  });

  it("shows a sample submission detail view", async () => {
    renderApp("/submissions/sample-1");

    expect(
      await screen.findByRole("heading", { name: "RSP-2026-0001" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Under Review")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Supporting documents",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Submission details")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Submission type")).toBeInTheDocument();
    expect(screen.getByText("Organization and contact")).toBeInTheDocument();
    expect(screen.queryByText("Détails de la soumission")).not.toBeInTheDocument();
    expect(screen.getByText("Last updated")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Description" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/product-summary\.pdf/),
    ).toBeInTheDocument();
  });

  it("switches submission details and navigation between English and French", async () => {
    const user = userEvent.setup();
    renderApp("/submissions/sample-1");

    expect(
      screen.getByRole("group", { name: "Language / Langue" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(document.documentElement).toHaveAttribute("lang", "en");

    await user.click(screen.getByRole("button", { name: "Français" }));

    expect(document.documentElement).toHaveAttribute("lang", "fr");
    expect(screen.getByRole("heading", { name: "Aperçu" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Organisation et personne-ressource",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Documents justificatifs" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Dernière mise à jour")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Retour à toutes les soumissions/ }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Overview")).not.toBeInTheDocument();
    expect(screen.queryByText("Supporting documents")).not.toBeInTheDocument();
    expect(screen.getAllByText("Aurora Lantern Foods Inc.")).toHaveLength(2);
    expect(
      screen.getByRole("navigation", { name: "Navigation principale" }),
    ).toHaveTextContent("Soumissions");

    await user.click(screen.getByRole("button", { name: "English" }));

    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getAllByText("Aurora Lantern Foods Inc.")).toHaveLength(2);
    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toHaveTextContent("Submissions");
  });

  it("shows a not-found view for an unknown submission", async () => {
    renderApp("/submissions/unknown");

    expect(
      await screen.findByRole("heading", { name: "Submission not found" }),
    ).toBeInTheDocument();
  });
});

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
        name: /Supporting documents.*Documents justificatifs/,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Submission details/)).toBeInTheDocument();
    expect(screen.getByText(/Détails de la soumission/)).toHaveAttribute(
      "lang",
      "fr",
    );
    expect(screen.getByText(/Statut/)).toBeInTheDocument();
    expect(screen.getByText(/Type de soumission/)).toBeInTheDocument();
    expect(screen.getAllByText(/Organisation/)).toHaveLength(2);
    expect(screen.getByText(/Personne-ressource/)).toBeInTheDocument();
    expect(screen.getByText(/Dernière mise à jour/)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Description.*Description/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/product-summary\.pdf/),
    ).toBeInTheDocument();
  });

  it("shows a not-found view for an unknown submission", async () => {
    renderApp("/submissions/unknown");

    expect(
      await screen.findByRole("heading", { name: "Submission not found" }),
    ).toBeInTheDocument();
  });
});

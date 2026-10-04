import { NavLink, Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <div>
            <span className="wordmark">National Regulatory Services</span>
            <span className="site-title">Submission Portal</span>
          </div>
          <nav aria-label="Primary navigation">
            <NavLink to="/" end>
              Submissions
            </NavLink>
            <NavLink to="/submissions/new">New submission</NavLink>
          </nav>
        </div>
      </header>
      <main id="main-content" className="container main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          Demonstration application. All organizations, people, submissions, and
          decisions shown are invented and do not represent any government
          organization.
        </div>
      </footer>
    </>
  );
}

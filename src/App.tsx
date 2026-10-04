import { Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import DashboardPage from "./pages/DashboardPage";
import NewSubmissionPage from "./pages/NewSubmissionPage";
import NotFoundPage from "./pages/NotFoundPage";
import SubmissionDetailPage from "./pages/SubmissionDetailPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="submissions/new" element={<NewSubmissionPage />} />
        <Route path="submissions/:id" element={<SubmissionDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}


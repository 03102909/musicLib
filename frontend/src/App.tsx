import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import StatisticsPage from "./pages/StatisticsPage";
import LibraryPage from "./pages/LibraryPage";
import AdminCatalogPage from "./pages/AdminCatalogPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/albums/:id" element={<AlbumDetailPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route
          path="/library"
          element={
            <ProtectedRoute roles={["user"]}>
              <LibraryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminCatalogPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

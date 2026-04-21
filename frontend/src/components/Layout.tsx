import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Layout() {
  const location = useLocation();
  const { isAuthenticated, isAdmin, isUser, user, logout } = useAuth();

  const navLinks = [
    { to: "/", label: "Каталог", show: true },
    { to: "/statistics", label: "Статистика", show: true },
    { to: "/library", label: "Бібліотека", show: isUser },
    { to: "/admin", label: "Адмін-панель", show: isAdmin },
  ];

  const visibleLinks = navLinks.filter((l) => l.show);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-header border-b border-base-300/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-forest font-bold text-2xl tracking-tight font-display">
                Music Library<span className="text-deep-red">.</span>
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-1">
              {visibleLinks.map((link) => {
                const isActive =
                  link.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 rounded text-base font-semibold uppercase tracking-wider transition-colors ${
                      isActive
                        ? "text-cream"
                        : "text-muted hover:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted hidden sm:inline">
                    {user.email}
                  </span>
                  <button
                    onClick={logout}
                    className="btn btn-sm bg-base-300 text-muted hover:text-cream hover:bg-base-400 border-none text-base font-semibold"
                  >
                    Вийти
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-sm bg-forest text-base-100 hover:bg-forest/80 border-none text-base font-semibold"
                >
                  Увійти
                </Link>
              )}
            </div>
          </div>

          <nav className="sm:hidden flex items-center gap-1 pb-3 overflow-x-auto">
            {visibleLinks.map((link) => {
              const isActive =
                link.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded text-base whitespace-nowrap font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-cream"
                      : "text-muted hover:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-base-300/50 bg-header">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p className="text-base text-muted">
            &copy; 2026 Music Library
          </p>
        </div>
      </footer>
    </div>
  );
}

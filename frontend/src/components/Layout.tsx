import { Link, Outlet, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Каталог" },
  { to: "/statistics", label: "Статистика" },
  { to: "/library", label: "Бібліотека" },
];

export default function Layout() {
  const location = useLocation();

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
              {navLinks.map((link) => {
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
              <Link
                to="/login"
                className="btn btn-sm bg-forest text-base-100 hover:bg-forest/80 border-none text-base font-semibold"
              >
                Увійти
              </Link>
            </div>
          </div>

          <nav className="sm:hidden flex items-center gap-1 pb-3 overflow-x-auto">
            {navLinks.map((link) => {
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

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  roles?: string[];
};

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-deep-red mb-3">403</h1>
          <p className="text-xl text-cream mb-2">Доступ заборонено</p>
          <p className="text-muted text-lg">У вас немає прав для перегляду цієї сторінки</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

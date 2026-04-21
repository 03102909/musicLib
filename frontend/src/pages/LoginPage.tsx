import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Заповніть всі поля", "error");
      return;
    }
    setLoading(true);
    try {
      if (isRegister) {
        await register(email, password);
        addToast("Реєстрація успішна!", "success");
      } else {
        await login(email, password);
        addToast("Ви увійшли!", "success");
      }
      navigate("/", { replace: true });
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Помилка авторизації";
      addToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-cream mb-2">
            Music Library<span className="text-deep-red">.</span>
          </h1>
          <p className="text-lg text-muted">
            {isRegister
              ? "Створіть акаунт для доступу до бібліотеки"
              : "Увійдіть, щоб керувати бібліотекою"}
          </p>
        </div>

        <div className="bg-base-200 rounded-lg border border-base-300/50 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-base text-muted uppercase tracking-wider font-medium block mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                className="input input-bordered bg-base-300 border-base-400/50 w-full text-lg text-cream placeholder:text-muted/50 focus:border-forest focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-base text-muted uppercase tracking-wider font-medium block mb-1.5">
                Пароль
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered bg-base-300 border-base-400/50 w-full text-lg text-cream placeholder:text-muted/50 focus:border-forest focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn bg-forest text-base-100 hover:bg-forest/80 border-none w-full mt-2 text-lg"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Зачекайте..."
                : isRegister
                ? "Зареєструватися"
                : "Увійти"}
            </button>
          </form>

          <div className="border-t border-base-300 mt-5 pt-4 text-center">
            <p className="text-base text-muted">
              {isRegister ? "Вже є акаунт?" : "Немає акаунту?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-forest hover:text-deep-red transition-colors font-medium"
              >
                {isRegister ? "Увійти" : "Зареєструватися"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

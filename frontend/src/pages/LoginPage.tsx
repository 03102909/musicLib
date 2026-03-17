export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-cream mb-2">
            Music Library<span className="text-deep-red">.</span>
          </h1>
          <p className="text-lg text-muted">
            Увійдіть, щоб керувати бібліотекою
          </p>
        </div>

        <div className="bg-base-200 rounded-lg border border-base-300/50 p-6">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <div>
              <label className="text-base text-muted uppercase tracking-wider font-medium block mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                className="input input-bordered bg-base-300 border-base-400/50 w-full text-lg text-cream placeholder:text-muted/50 focus:border-forest focus:outline-none"
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
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-xs border-base-400" />
                <span className="text-base text-muted">Запам'ятати мене</span>
              </label>
              <a href="#" className="text-base text-forest hover:text-deep-red transition-colors">
                Забули пароль?
              </a>
            </div>

            <button
              className="btn bg-forest text-base-100 hover:bg-forest/80 border-none w-full mt-2 text-lg"
              type="submit"
            >
              Увійти
            </button>
          </form>

          <div className="border-t border-base-300 mt-5 pt-4 text-center">
            <p className="text-base text-muted">
              Немає акаунту?{" "}
              <a href="#" className="text-forest hover:text-deep-red transition-colors font-medium">
                Зареєструватися
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

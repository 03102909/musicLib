export default function StatisticsPage() {
  const genreStats = [
    { name: "Rock", count: 42, color: "bg-forest" },
    { name: "Pop", count: 35, color: "bg-deep-red" },
    { name: "Jazz", count: 28, color: "bg-warm" },
    { name: "Electronic", count: 24, color: "bg-steel" },
    { name: "Hip-Hop", count: 20, color: "bg-sage" },
    { name: "Classical", count: 15, color: "bg-forest/70" },
    { name: "R&B", count: 12, color: "bg-deep-red/70" },
    { name: "Metal", count: 10, color: "bg-sage/70" },
  ];

  const yearStats = [
    { decade: "1960s", count: 8 },
    { decade: "1970s", count: 15 },
    { decade: "1980s", count: 22 },
    { decade: "1990s", count: 30 },
    { decade: "2000s", count: 35 },
    { decade: "2010s", count: 45 },
    { decade: "2020s", count: 20 },
  ];

  const maxGenre = Math.max(...genreStats.map((g) => g.count));
  const maxYear = Math.max(...yearStats.map((y) => y.count));

  return (
    <div>
      <section className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-3">
          Статистика
        </h1>
        <p className="text-muted text-lg">Аналітика каталогу музичних альбомів</p>
      </section>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Всього альбомів", value: "186", sub: "+12 за місяць", accent: "text-forest" },
          { label: "Виконавців", value: "94", sub: "+5 нових", accent: "text-deep-red" },
          { label: "Жанрів", value: "12", sub: "від класики до хіп-хопу", accent: "text-warm" },
          { label: "Середня оцінка", value: "4.2", sub: "з 5 можливих", accent: "text-steel" },
        ].map((card) => (
          <div key={card.label} className="bg-base-200 rounded-lg border border-base-300/50 p-4">
            <p className="text-base text-muted uppercase tracking-wider mb-1">{card.label}</p>
            <p className={`text-3xl font-bold font-display ${card.accent}`}>{card.value}</p>
            <p className="text-base text-muted mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Genre chart */}
        <div className="bg-base-200 rounded-lg border border-base-300/50 p-5">
          <h2 className="font-display text-2xl font-semibold text-cream mb-5">
            Альбоми за жанрами
          </h2>
          <div className="space-y-3">
            {genreStats.map((g) => (
              <div key={g.name} className="flex items-center gap-3">
                <span className="w-24 text-base text-muted text-right font-medium">{g.name}</span>
                <div className="flex-1 bg-base-300 rounded h-7 overflow-hidden">
                  <div
                    className={`${g.color} h-full rounded flex items-center justify-end pr-2 transition-all duration-700`}
                    style={{ width: `${(g.count / maxGenre) * 100}%` }}
                  >
                    <span className="text-sm font-bold text-base-100">{g.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Year chart */}
        {/* <div className="bg-base-200 rounded-lg border border-base-300/50 p-5">
          <h2 className="font-display text-xl font-semibold text-cream mb-4">
            Альбоми за десятиліттями
          </h2>
          <div className="flex items-end gap-2 h-48">
            {yearStats.map((y) => (
              <div key={y.decade} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-muted font-medium">{y.count}</span>
                <div className="w-full bg-base-300 rounded-t overflow-hidden relative" style={{ height: "100%" }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-forest to-forest/30 rounded-t transition-all duration-700"
                    style={{ height: `${(y.count / maxYear) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted -rotate-45 origin-top-left whitespace-nowrap mt-1">
                  {y.decade}
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Top rated */}
        <div className="bg-base-200 rounded-lg border border-base-300/50 p-5">
          <h2 className="font-display text-2xl font-semibold text-cream mb-5">
            Топ за рейтингом
          </h2>
          <div className="space-y-1">
            {[
              { pos: 1, title: "Abbey Road", artist: "The Beatles", rating: 4.9 },
              { pos: 2, title: "Kind of Blue", artist: "Miles Davis", rating: 4.8 },
              { pos: 3, title: "Nevermind", artist: "Nirvana", rating: 4.7 },
              { pos: 4, title: "OK Computer", artist: "Radiohead", rating: 4.6 },
              { pos: 5, title: "Thriller", artist: "Michael Jackson", rating: 4.5 },
            ].map((item) => (
              <div
                key={item.pos}
                className="flex items-center gap-3 p-2 rounded hover:bg-base-300/50 transition-colors"
              >
                <span className={`w-6 text-center text-base font-mono ${item.pos <= 3 ? 'text-deep-red font-bold' : 'text-muted'}`}>{item.pos}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-medium text-cream truncate">{item.title}</p>
                  <p className="text-base text-muted">{item.artist}</p>
                </div>
                <span className="text-base text-warm font-medium">{item.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

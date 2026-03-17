import { useParams, Link } from "react-router-dom";
import RatingStars from "../components/RatingStars";

const mockAlbums: Record<string, {
  id: number;
  title: string;
  artist: string;
  year: number;
  coverUrl: string;
  genres: string[];
  description: string;
}> = {
  "1": {
    id: 1,
    title: "Nevermind",
    artist: "Nirvana",
    year: 1991,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
    genres: ["Rock", "Grunge"],
    description:
      "Другий студійний альбом американського рок-гурту Nirvana, випущений 24 вересня 1991 року. Альбом містить легендарний хіт «Smells Like Teen Spirit», який став гімном покоління. Nevermind став одним із найвпливовіших альбомів в історії рок-музики.",
  },
  "2": {
    id: 2,
    title: "Random Access Memories",
    artist: "Daft Punk",
    year: 2013,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
    genres: ["Electronic", "Disco"],
    description:
      "Четвертий та останній студійний альбом французького електронного дуету Daft Punk. Альбом є данню поваги диско та фанку 70-х—80-х років. Містить хіт «Get Lucky» з Pharrell Williams.",
  },
  "3": {
    id: 3,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
    genres: ["Rock", "Pop"],
    description:
      "Одинадцятий студійний альбом The Beatles, відомий своєю культовою обкладинкою та медлі на другій стороні. Містить треки «Come Together», «Here Comes the Sun» та «Something».",
  },
  "4": {
    id: 4,
    title: "Kind of Blue",
    artist: "Miles Davis",
    year: 1959,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg",
    genres: ["Jazz"],
    description:
      "Шедевр модального джазу та найпродаваніший джазовий альбом усіх часів. Записаний із легендарним складом музикантів, включаючи John Coltrane та Bill Evans.",
  },
  "5": {
    id: 5,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    genres: ["Rock", "Progressive"],
    description:
      "Восьмий студійний альбом Pink Floyd, один з найпродаваніших альбомів в історії музики. Концептуальний альбом про теми конфлікту, жадібності, часу та психічних захворювань.",
  },
  "6": {
    id: 6,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
    genres: ["Pop", "R&B"],
    description:
      "Шостий студійний альбом Майкла Джексона — найпродаваніший альбом в історії музики. Містить 7 синглів, включаючи «Billie Jean», «Beat It» та заголовний трек «Thriller».",
  },
  "7": {
    id: 7,
    title: "OK Computer",
    artist: "Radiohead",
    year: 1997,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png",
    genres: ["Rock", "Electronic"],
    description:
      "Третій студійний альбом Radiohead, що досліджує теми сучасного суспільства, технології та відчуження. Вважається одним із найкращих альбомів 90-х років.",
  },
  "8": {
    id: 8,
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    year: 2015,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png",
    genres: ["Hip-Hop", "Jazz"],
    description:
      "Третій студійний альбом Кендріка Ламара, що поєднує хіп-хоп, джаз, фанк і соул. Альбом є глибоким дослідженням расової ідентичності, депресії та культурного спадку.",
  },
};

export default function AlbumDetailPage() {
  const { id } = useParams<{ id: string }>();
  const album = mockAlbums[id || ""];

  if (!album) {
    return (
      <div className="text-center py-20">
        <h2 className="font-display text-3xl font-bold text-cream mb-2">Альбом не знайдено</h2>
        <p className="text-muted text-lg mb-6">Такого альбому немає в каталозі</p>
        <Link to="/" className="text-forest hover:text-deep-red transition-colors text-lg font-medium">
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="text-lg mb-6 flex items-center gap-2 text-muted">
        <Link to="/" className="hover:text-cream transition-colors">Каталог</Link>
        <span className="text-base-400">/</span>
        <span className="text-cream">{album.title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Cover */}
        <div className="md:w-72 shrink-0">
          <div className="relative rounded-lg overflow-hidden border border-base-300/50 shadow-lg shadow-black/20 bg-gradient-to-br from-deep-red/30 to-forest/30 aspect-square">
            {album.coverUrl ? (
              <img
                src={album.coverUrl}
                alt={album.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : null}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-1">
            {album.title}
          </h1>
          <p className="text-xl text-muted mb-4">
            <span className="text-steel">{album.artist}</span>
            <span className="text-deep-red mx-2">·</span>
            <span className="text-steel">{album.year}</span>
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {album.genres.map((g) => (
              <span
                key={g}
                className="px-3 py-1 rounded bg-base-300 text-base text-muted border border-base-400/50 border-l-2 border-l-deep-red/50"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="border-t border-base-300 pt-5 mb-6">
            <p className="text-lg text-cream/80 leading-relaxed">
              {album.description}
            </p>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <p className="text-base text-muted uppercase tracking-widest mb-2 font-medium">
              Ваша оцінка
            </p>
            <RatingStars value={4} size="lg" />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="btn bg-forest text-base-100 hover:bg-forest/90 border-none text-lg px-6">
              Додати в бібліотеку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

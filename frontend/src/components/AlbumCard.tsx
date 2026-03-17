import { Link } from "react-router-dom";

type AlbumCardProps = {
  id: number;
  title: string;
  artist: string;
  year: number;
  coverUrl: string;
  genres: string[];
};

export default function AlbumCard({
  id,
  title,
  artist,
  year,
  coverUrl,
  genres,
}: AlbumCardProps) {
  return (
    <Link to={`/albums/${id}`} className="group block">
      <div className="rounded-lg overflow-hidden bg-base-200 border border-base-300/50 hover:border-forest/40 transition-colors duration-200">
        <figure className="relative aspect-square overflow-hidden bg-gradient-to-br from-deep-red/30 to-forest/30">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`${title} — ${artist}`}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : null}
        </figure>
        <div className="p-4">
          <h3 className="font-display font-semibold text-lg text-cream leading-tight line-clamp-1 group-hover:text-forest transition-colors">
            {title}
          </h3>
          <p className="text-base text-muted mt-1">{artist}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-base text-steel">{year}</span>
            {genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-sm text-muted/60 before:content-['·'] before:mr-1"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

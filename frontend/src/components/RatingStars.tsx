type RatingStarsProps = {
  value: number;
  name?: string;
  onChange?: (val: number) => void;
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
};

export default function RatingStars({
  value,
  name = "rating",
  onChange,
  size = "sm",
  disabled = false,
}: RatingStarsProps) {
  const sizeClass: Record<string, string> = {
    xs: "rating-xs",
    sm: "rating-sm",
    md: "rating-md",
    lg: "rating-lg",
  };

  return (
    <div className={`rating ${sizeClass[size]} gap-1`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          type="radio"
          name={name}
          className="mask mask-star-2 bg-deep-red"
          checked={value === star}
          onChange={() => onChange?.(star)}
          disabled={disabled}
          aria-label={`${star} зірок`}
        />
      ))}
    </div>
  );
}

type BrandLogoProps = {
  src: string;
  alt: string;
  className?: string;
  active?: boolean;
  onLight?: boolean;
};

export function BrandLogo({
  src,
  alt,
  className = "",
  active = false,
  onLight = false,
}: BrandLogoProps) {
  return (
    <span
      className={`brand-logo ${onLight ? "brand-logo--on-light" : ""} ${active ? "brand-logo--active" : ""} ${className}`.trim()}
    >
      <img src={src} alt={alt} className="brand-logo__img" />
    </span>
  );
}

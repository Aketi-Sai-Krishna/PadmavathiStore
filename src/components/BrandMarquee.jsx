import { brands } from "../data/brands.js";

function BrandSet({ items, copy = false }) {
  return (
    <div className="brand-marquee-set" aria-hidden={copy ? "true" : undefined}>
      {items.map((brand) => (
        <span className={`brand-wordmark ${brand.style}`} key={brand.name}>
          {brand.name}
        </span>
      ))}
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section className="brand-marquee-section" aria-label="Brands we distribute">
      <div className="container brand-marquee-heading">
        <span className="eyebrow">Familiar favourites, year after year</span>
        <h2>Brands we have distributed <em>over the years.</em></h2>
        <p>Trusted names for everyday shopping, stocked for local retailers and neighbourhood stores.</p>
      </div>
      <div className="brand-marquee" role="presentation">
        <div className="brand-marquee-track">
          <BrandSet items={brands} />
          <BrandSet items={brands} copy />
        </div>
      </div>
    </section>
  );
}

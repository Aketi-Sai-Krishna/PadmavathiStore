import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function CategoryCard({ category, index }) {
  return (
    <a
      className={`category-card category-${category.tone} reveal`}
      style={{ "--delay": `${(index % 4) * 70}ms` }}
      href={`/category/${category.slug}`}
      aria-label={`Explore ${category.title} products`}
    >
      <div className="category-photo">
        <img
          src={category.image}
          alt={`${category.title} products`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.parentElement.classList.add("image-fallback");
          }}
        />
        <span className="category-tag">{category.tag}</span>
        <span className="photo-arrow"><ArrowUpRight size={19} /></span>
      </div>
      <div className="category-content">
        <div>
          <span className="category-subtitle">{category.subtitle}</span>
          <h3>{category.title}</h3>
        </div>
        <ArrowDownRight className="category-arrow" size={23} />
        <p>{category.description}</p>
      </div>
    </a>
  );
}
